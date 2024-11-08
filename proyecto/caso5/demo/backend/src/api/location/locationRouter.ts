// src/api/backendManager/routers/userRouter.ts
import { Router } from "express";
import { locationControler } from "../../index";

const locationRouter = Router();

locationRouter.get("/", (req, res) => locationControler.getLocation(req, res));

export { locationRouter };