import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";

import router from "./src/routes/index.js";
import { getDirname } from "./src/config/utils.js";
import { loggerMiddleware } from "./src/middleware/loggerMiddleware.js";

const PORT = process.env.PORT || 5000;
const __dirname = getDirname(import.meta.url);

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use(express.static(path.join(__dirname, "./public")));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

export default app;
