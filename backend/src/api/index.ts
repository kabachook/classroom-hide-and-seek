import { Router } from "express";
import githubWebhook from "./routes/githubWebhook";

export default () => {
  const app = Router();
  githubWebhook(app);

  return app;
};
