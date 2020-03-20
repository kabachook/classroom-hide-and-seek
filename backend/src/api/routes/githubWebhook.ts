import { Request, Response, Router } from "express";
import Container from "typedi";
import GithubWebhookService from "../../services/githubWebhook";
import { WebhookPayload } from "../../types/github";

export default (app: Router) => {
  const githubWebhookService = Container.get(GithubWebhookService);

  app.post("/webhook/github", async (req: Request, res: Response) => {
    const eventType = req.headers["x-github-event"] as string;
    const event = req.body;

    await githubWebhookService.handleWebhook(
      event as WebhookPayload,
      eventType
    );

    res.status(200).json({ ok: true });
  });
};
