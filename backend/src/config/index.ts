import dotenv from "dotenv";
import logger from "../loaders/logger";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠ Couldn't find .env file!");
}

const parsedEnv = {
  port: parseInt(process.env.PORT, 10) || 3000,
  travisciKey: process.env.TRAVISCI_KEY
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
