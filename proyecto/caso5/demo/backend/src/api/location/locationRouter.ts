// src/api/location/locationRouter.ts
import { Router } from "express";
import { locationControler } from "../../index";

const locationRouter = Router();

locationRouter.get("/", (req, res) => locationControler.getLocation(req, res));
locationRouter.get("/nearby", (req, res) => locationControler.findNearbyLocations(req, res));

export { locationRouter };