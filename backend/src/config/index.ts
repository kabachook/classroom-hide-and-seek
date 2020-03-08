import dotenv from "dotenv";
import { resolve } from "path";
import logger from "../loaders/logger";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config({ path: resolve(__dirname, "../../.env") });
if (!envFound || envFound.error) {
  if (envFound.error) logger.error(envFound.error);
  throw new Error("⚠ Couldn't find .env file!");
}

logger.info(envFound.parsed, "Loaded .env");

const parsedEnv = {
  port: parseInt(process.env.PORT, 10) || 3000,
  travisciKey: process.env.TRAVISCI_KEY,
  organization: process.env.ORGANIZATION,
  redisUrl: process.env.REDIS_URL,
  sshKey: process.env.SSH_KEY,
  sshKeyEnvVarName: process.env.SSH_KEY_ENV_VAR_NAME
};

let willExit = false;

for (const [key, value] of Object.entries(parsedEnv)) {
  if (!value) {
    logger.fatal(`${key} is not set`);
    willExit = true;
  }
}

if (willExit) {
  process.exit(1);
}

export default parsedEnv;
