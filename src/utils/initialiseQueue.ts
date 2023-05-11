import Queue, { Queue as IQueue } from "bull";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export const userQueue: IQueue = new Queue("userQueue", REDIS_URL);
