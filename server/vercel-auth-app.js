import express from "express";
import helmet from "helmet";
import { createAuthRouter } from "./auth-routes.js";

export function createVercelAuthApp(action) {
  const app = express();
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(express.json({ limit: "8kb" }));
  app.use((request, _response, next) => { request.url = `/${action}`; next(); });
  app.use(createAuthRouter());
  app.use((error, _request, response, _next) => {
    console.error("Unhandled API error", { message: error.message });
    response.status(500).json({ message: "Something went wrong. Please try again." });
  });
  return app;
}
