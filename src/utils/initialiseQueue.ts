import Queue, { Queue as IQueue } from "bull";

export const userQueue: IQueue = new Queue("userQueue");
