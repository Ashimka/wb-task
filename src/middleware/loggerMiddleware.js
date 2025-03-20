import { log } from "../services/loggerService.js";

export const loggerMiddleware = (req, res, next) => {
  const { method, url, body, query } = req;
  const message = `Request: ${method} ${url}, Body: ${JSON.stringify(
    body
  )}, Query: ${JSON.stringify(query)}`;

  log("request", message);
  next();
};
