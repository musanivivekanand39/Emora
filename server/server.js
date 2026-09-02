import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createAuthRouter } from "./auth-routes.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));
app.use(express.json({ limit: "8kb" }));
app.use("/auth", createAuthRouter());
app.use((error, _request, response, _next) => {
  console.error("Unhandled API error", { message: error.message });
  response.status(500).json({ message: "Something went wrong. Please try again." });
});

app.listen(process.env.PORT || 3000, () => console.info("Emora auth API started"));
