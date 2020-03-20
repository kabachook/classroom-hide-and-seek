import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "./logger";
import pino from "express-pino-logger";
import api from "../api";

export default async function({ app }: { app: express.Application }) {
  app.use(
    cors({
      origin: true
    })
  );

  app.enable("trust proxy");
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).end();
  });

  app.use(
    pino({
      logger
    })
  );

  app.use(api());

  app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    logger.error(err);
    res.status(500).json({ ok: false, error: err });
  });
}
