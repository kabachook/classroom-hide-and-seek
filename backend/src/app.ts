import "reflect-metadata";

import express from "express";
import config from "./config";
import logger from "./loaders/logger";

async function startServer(): Promise<void> {
  const app = express();

  (await import("./loaders")).default({ app });

  app.listen(config.port, err => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }

    logger.info(`🌪 Server listening on port ${config.port}`);
  });
}

process.on("uncaughtException", err => {
  logger.fatal(err, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (err, promise) => {
  logger.fatal({ err, promise }, "Unhandled rejection");
  process.exit(1);
});

startServer();
