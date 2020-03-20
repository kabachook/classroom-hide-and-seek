import logger from "./logger";
import typeormLoader from "./typeorm";
import diLoader from "./dependencyInjector";
import expressLoader from "./express";

export default async function({ app }) {
  await typeormLoader();
  logger.info("Database ok");

  diLoader();
  logger.info("DI ok");

  await expressLoader({ app });
  logger.info("Express loaded");
}
