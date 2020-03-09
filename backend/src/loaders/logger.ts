import pino from "pino";
import config from "../config";

export default pino({
  prettyPrint:
    process.env.NODE_ENV === "development" ? { colorize: true } : false,
  base: null
});
