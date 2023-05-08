import express from "express";
import http from "http";

export const app = express();
app.use(express.json({ limit: "500kb" }));

export const server = http.createServer(app);
