// src/api/infoCasa/infoCasaRouter.ts
import { Router } from "express";
import { infoCasaController } from "../../index";

const infoCasaRouter = Router();

infoCasaRouter.get("/", (req, res) => infoCasaController.getInfoCasas(req, res));
infoCasaRouter.post("/", (req, res) => infoCasaController.createInfoCasa(req, res));

export { infoCasaRouter };