import { Application } from "express";
import Redis from "ioredis";
import config from "../config";

export default function({ app: Application }) {
  const redis = new Redis(config.redisUrl);
}
