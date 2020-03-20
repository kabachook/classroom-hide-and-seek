import { Router } from "express";
import githubWebhook from "./routes/githubWebhook";
import rule from "./routes/rule";

export default () => {
  const app = Router();
  githubWebhook(app);
  rule(app);

  return app;
};
