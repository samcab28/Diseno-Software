// src/api/artificial_intelligence/aiRouter.ts
import { Router } from "express";
import { aiController } from "../../index";

const airouter = Router();

// Routes
airouter.post("/generate", (req, res) => aiController.generateResponse(req, res));
airouter.post("/analyze-curriculum", (req, res) => aiController.analyzeCurriculum(req, res));

export { airouter };