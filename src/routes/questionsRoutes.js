import { Router } from "express";

import {
  getAutoQuestions,
  getQuestions,
} from "../controllers/questionsController.js";

const router = new Router();

router.get("/", getQuestions);
router.get("/auto/:id", getAutoQuestions);
export default router;
