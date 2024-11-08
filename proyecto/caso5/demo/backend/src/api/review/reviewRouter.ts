// src/api/review/reviewRouter.ts
import { Router } from "express";
import { reviewController } from "../../index";

const reviewRouter = Router();

reviewRouter.post("/", (req, res) => reviewController.createReview(req, res));
reviewRouter.get("/user/:userId", (req, res) => reviewController.getReviewsByUserId(req, res));
reviewRouter.get("/user/:userId/stats", (req, res) => reviewController.getReviewStats(req, res));
reviewRouter.post("/:reviewId/response", (req, res) => reviewController.respondToReview(req, res));
reviewRouter.put("/:reviewId", (req, res) => reviewController.deleteReview(req, res));

export { reviewRouter };