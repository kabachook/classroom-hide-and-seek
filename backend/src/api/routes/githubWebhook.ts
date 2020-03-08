import { Request, Response, Router } from "express";
import Container from "typedi";
import GithubWebhookService from "../../services/githubWebhook";

export default (app: Router) => {
  app.post("/webhook/github", async (req: Request, res: Response) => {
    const githubEvent = req.body;
    const githubWebhookService = Container.get(GithubWebhookService);

    await githubWebhookService.handleWebhook(githubEvent);

    res.status(200).json({ ok: true });
  });
};
