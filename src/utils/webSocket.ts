import { Server, Socket } from "socket.io";
import { server } from "./server";

// Enable CORS for http://localhost:3000
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "sellerbot.vercel.app"],
    methods: ["GET", "POST"],
  },
});

export const userConnections = new Map();

export const getSocket = (userId: string): Socket =>
  userConnections.get(userId);
