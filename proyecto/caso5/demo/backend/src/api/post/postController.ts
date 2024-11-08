// src/api/post/postController.ts
import { Request, Response } from "express";
import { PostService } from "./postService";

export class PostController {
    constructor(private readonly postService: PostService) {}

    async getPosts(req: Request, res: Response) {
        try {
            const posts = await this.postService.getAllPosts();
            res.status(200).json({ status: "success", data: posts });
        } catch (error) {
            console.error('Error in getPosts controller:', error);
            res.status(500).json({ 
                status: "error", 
                message: error instanceof Error ? error.message : 'Internal server error' 
            });
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const newPost = await this.postService.createPost(req.body);
            res.status(201).json({ status: "success", data: newPost });
        } catch (error) {
            console.error('Error in createPost controller:', error);
            res.status(500).json({ 
                status: "error", 
                message: error instanceof Error ? error.message : 'Internal server error' 
            });
        }
    }

    async updatePostStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { estado } = req.body;
            
            // Validar que el estado sea válido
            const estadosValidos = ['pendiente', 'aceptado', 'rechazado', 'completado'];
            if (!estadosValidos.includes(estado)) {
                return res.status(400).json({
                    status: "error",
                    message: "Estado no válido"
                });
            }

            const updatedPost = await this.postService.updatePostStatus(id, estado);
            res.status(200).json({ status: "success", data: updatedPost });
        } catch (error) {
            console.error('Error in updatePostStatus controller:', error);
            res.status(500).json({ 
                status: "error", 
                message: error instanceof Error ? error.message : 'Internal server error' 
            });
        }
    }
}