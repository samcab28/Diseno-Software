// backend-service/controllers/userController.ts

import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ status: "success", data: users });
        } catch (error) {
            console.error('Error in getUsers controller:', error);
            res.status(500).json({ status: "error", message: "Failed to retrieve users" });
        }
    }
}
