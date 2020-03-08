import Bull from "bull";
import { Container } from "typedi";

const logger = Container.get("logger");

/**
 * Process new repo event
 * 1. Set ssh key to env var
 * 2. Force rebuild
 */

module.exports = function(job: Bull.Job) {
  const data = job.data;
};
