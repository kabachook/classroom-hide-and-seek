import express, { Request, Response, NextFunction } from "express";
import logger from "./logger";
import pino from "express-pino-logger";

export default async function({ app }: { app: express.Application }) {
  app.get("/health", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");
  app.use(express.json());

  app.use(
    pino({
      logger
    })
  );

  // Routes

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    res.status(500).json({ ok: false, error: err });
  });
}
