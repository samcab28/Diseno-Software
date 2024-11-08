// src/api/post/postRouter.ts
import { Router } from "express";
import { postController } from "../../index";

const postRouter = Router();

postRouter.get("/", (req, res) => postController.getPosts(req, res));
postRouter.post("/", (req, res) => postController.createPost(req, res));
postRouter.patch("/:id/status", (req, res) => postController.updatePostStatus(req, res));

export { postRouter };