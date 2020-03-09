import { Container } from "typedi";
import logger from "./logger";

export default () => {
  Container.set("logger", logger);
};
