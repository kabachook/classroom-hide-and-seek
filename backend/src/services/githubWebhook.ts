import minimatch from "minimatch";
import { Inject, Service } from "typedi";
import logger from "../loaders/logger";
import { WebhookPayload } from "../types/github";
import JobsService from "./jobs";
import RuleService from "./rule";

@Service()
export default class GithubWebhookService {
  @Inject()
  private jobs: JobsService;

  @Inject()
  private ruleService: RuleService;

  public async handleWebhook(event: WebhookPayload, type: string) {
    logger.info(event, `GitHub event`);
    if (type === "repository" && event.action === "created") {
      // this.jobs.newRepoQueue.add({ event, type });
      const name = event.repository.name;
      const rules = await this.ruleService.findRules();

      for (const rule of rules) {
        if (minimatch(name, rule.pattern)) {
          this.jobs.newRepoQueue.add({ event, sshKey: rule.sshKey });
          break;
        }
      }
    }
  }
}
