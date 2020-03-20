import pino from "pino";

export default pino({
  prettyPrint:
    process.env.NODE_ENV === "development" ? { colorize: true } : false,
  base: null
});
