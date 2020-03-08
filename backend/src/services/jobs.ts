import { Service, Inject, Container } from "typedi";
import Bull from "bull";
import config from "../config";
import TravisService from "./travis";
import logger from "../loaders/logger";

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
      logger.info("Redis reconnecting...")
    );
    this.newRepoQueue.client.on("close", () =>
      logger.error("Redis connection closed")
    );
    this.newRepoQueue.process(async (job: Bull.Job) => {
      const { event, retry } = job.data;
      const repo = event.repository.name;
      const user = event.repository.owner.login;

      try {
        // 1. Push ssh key
        let res: any;
        res = await this.travis.setEnvVar(
          user,
          repo,
          config.sshKeyEnvVarName,
          config.sshKey
        );
        job.log(JSON.stringify(res));

        job.progress(50);

        // 2. Force rebuild
        const lastBuild = (await this.travis.getBuilds(user, repo))[0];
        job.log(JSON.stringify(lastBuild));

        res = await this.travis.restartBuild(lastBuild.id);
        job.log(JSON.stringify(res));

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
