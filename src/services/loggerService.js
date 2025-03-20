import fs from "fs";
import path from "path";
import { getDirname } from "../config/utils.js";

const __dirname = getDirname(import.meta.url);

const logFilePath = path.join(__dirname, "../../logs.txt");

export const log = (type, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Ошибка при записи в лог-файл:", err);
    }
  });
};
