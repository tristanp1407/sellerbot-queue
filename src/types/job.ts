import { User } from "../utils/addToQueue";

export type JobData = {
  user: User;
  userId: string;
  token: string;
  initialTotal: number;
  position: number;
};
