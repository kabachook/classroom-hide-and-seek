import { Service, Inject, Container } from "typedi";
import Bull from "bull";
import config from "../config";
import TravisService from "./travis";
import logger from "../loaders/logger";
import { WebhookPayload } from "../types/github";

@Service()
export default class Jobs {
  @Inject()
  private travis: TravisService;

  public newRepoQueue: Bull.Queue;

  constructor() {
    logger.info("Jobs up");
    this.newRepoQueue = new Bull("webhook", config.redisUrl);

    this.newRepoQueue.client.on("ready", () => logger.info("Redis connected"));
    this.newRepoQueue.client.on("reconnecting", () =>
      logger.warn("Redis reconnecting...")
    );
    this.newRepoQueue.client.on("close", () =>
      logger.error("Redis connection closed")
    );
    this.newRepoQueue.process(async (job: Bull.Job) => {
      const {
        event,
        sshKey,
        retry
      }: { event: WebhookPayload; sshKey: string; retry: number } = job.data;
      const repo = event.repository.name;
      const user = event.repository.owner.login;

      try {
        // 1. Push ssh key
        let res: any;
        try {
          res = await this.travis.setEnvVar(
            user,
            repo,
            config.sshKeyEnvVarName,
            Buffer.from(sshKey).toString("base64")
          );
          logger.info(`Pushed ssh key for ${user}/${repo}`);
        } catch (err) {
          if (err.response.status === 409) {
            job.log(`SSH key already set, forcing rebuild...`);
            logger.info(`SSH key already set for ${user}/${repo}`);
          }
        }
        job.log(JSON.stringify(res));
        job.progress(50);

        // 2. Force rebuild
        const builds = await this.travis.getBuilds(user, repo);
        job.log(JSON.stringify(res));

        if (builds.length !== 0) {
          const lastBuild = builds[0];
          res = await this.travis.restartBuild(lastBuild.id);
          logger.info(`Forced rebuild for ${user}/${repo}`);
          job.log(JSON.stringify(lastBuild));
        } else {
          logger.info(`No builds available for ${user}/${repo}`);
          job.log(JSON.stringify(builds));
        }

        job.progress(100);
      } catch (err) {
        logger.error(err, "New repo job error");
        job.log(JSON.stringify(err));

        await this.newRepoQueue.add(
          { ...job.data, retry: retry ? 1 : retry + 1 },
          { delay: 5000 }
        );

        throw err;
      }
    });
  }
}
