import logger from "./logger";
import diLoader from "./dependencyInjector";
import expressLoader from "./express";

export default async function({ app }) {
  diLoader();
  logger.info("DI ok");

  await expressLoader({ app });
  logger.info("Express loaded");
}
