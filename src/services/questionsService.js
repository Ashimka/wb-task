import { PrismaClient } from "@prisma/client";
import { KEYWORDS } from "../../data.js";
import { log } from "./loggerService.js";

const prisma = new PrismaClient();

export const getAutoResponse = (questions) => {
  let answer = null;
  let questionsItem = {};

  questions.forEach((message) => {
    Object.keys(KEYWORDS).forEach((keyword) => {
      if (message.text.toLowerCase().includes(keyword)) {
        answer = KEYWORDS[keyword];
        questionsItem = message;
      }
    });
  });

  return { answer, questionsItem };
};

export const saveOutgoingMessage = async (data) => {
  try {
    const { answer, questionsItem } = data;

    await prisma.message.create({
      data: {
        customerId: questionsItem.id,
        text: questionsItem.text,
        date: questionsItem.createdDate,
      },
    });

    await prisma.outgoingMessage.create({
      data: {
        text: answer,
        customerId: questionsItem.id,
      },
    });

    return;
  } catch (error) {
    log("error", `Ошибка при обработке сообщений: ${error.message}`);
  }
};
