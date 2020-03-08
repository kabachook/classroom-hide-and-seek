import logger from "./logger";
import expressLoader from "./express";

export default async function({ app }): Promise<void> {
  await expressLoader({ app });
  logger.info("Express loaded");
}
