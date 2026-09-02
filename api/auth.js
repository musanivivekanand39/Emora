import express from "express";
import helmet from "helmet";
import { createAuthRouter } from "../server/auth-routes.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "8kb" }));

// Vercel rewrites /api/auth/login to this function with the action in the query.
app.use((request, _response, next) => {
  const action = String(request.query.action || "");
  if (!/^(login|signup|password-reset|password-reset\/confirm)$/.test(action)) {
    return _response.status(404).json({ message: "Not found." });
  }
  request.url = `/${action}`;
  next();
});
app.use(createAuthRouter());
app.use((error, _request, response, _next) => {
  console.error("Unhandled API error", { message: error.message });
  response.status(500).json({ message: "Something went wrong. Please try again." });
});

export default app;
