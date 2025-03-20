import { Router } from "express";

import questionsRoutes from "./questionsRoutes.js";

const router = new Router();

router.use("/questions", questionsRoutes);

export default router;
