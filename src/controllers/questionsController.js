import { wbApi } from "../config/api.js";
import {
  autoQuestions,
  getAutoResponse,
  saveOutgoingMessage,
} from "../services/questionsService.js";
import { log } from "../services/loggerService.js";

export const getQuestions = async (req, res) => {
  const { isAnswered, order } = req.query;

  try {
    const { data } = await wbApi.get("/api/v1/questions", {
      params: {
        isAnswered: isAnswered || false,
        take: 10000,
        skip: 0,
        order,
      },
    });

    if (!isAnswered) {
      const autoResponse = getAutoResponse(data?.data.questions);

      if (autoResponse) {
        await saveOutgoingMessage(autoResponse);
      }
    }

    return res.status(200).json(data?.data.questions);
  } catch (error) {
    log("error", `Ошибка при получении вопросов: ${error.message}`);
    if (error.status === 401) {
      res.status(401).json({
        message: "Пользователь не авторизован",
      });
    }
  }
};

export const getAutoQuestions = async (req, res) => {
  const { id } = req.params;
  const question = await autoQuestions(id);

  if (!question) {
    return res.status(200).json({
      question: "",
      answer: "Нет подходящего ответа",
    });
  }

  return res.status(200).json({
    question: question.text,
    answer: question.responses[0].text,
  });
};
