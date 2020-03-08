import { Service, Inject } from "typedi";
import JobsService from "./jobs";
import logger from "../loaders/logger";

@Service()
export default class GithubWebhookService {
  @Inject()
  private jobs: JobsService;

  public async handleWebhook(event: Record<string, unknown>, type: string) {
    logger.info(event, `GitHub event`);
    this.jobs.newRepoQueue.add({ event, type });
  }
}
