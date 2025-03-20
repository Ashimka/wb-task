import { Router } from "express";

import { getQuestions } from "../controllers/questionsController.js";

const router = new Router();

router.get("/", getQuestions);

export default router;
