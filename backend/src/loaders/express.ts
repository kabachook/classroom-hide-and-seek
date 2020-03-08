import express from "express";

export default async function({
  app
}: {
  app: express.Application;
}): Promise<void> {
  app.get("/health", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");
  app.use(express.json());
}
