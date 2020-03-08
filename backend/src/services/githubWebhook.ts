import { Service, Inject } from "typedi";

@Service()
export default class GithubWebhookService {
  constructor(@Inject("logger") private logger) {}

  public async handleWebhook(body: Record<string, unknown>) {
    this.logger.info(`GitHub event: ${JSON.stringify(body)}`);
  }
}
