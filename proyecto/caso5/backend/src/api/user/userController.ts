import { Request, Response } from "express";
import { UserService } from "./userService";

export class UserController {
    constructor(private readonly userService: UserService) {}

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ status: "success", data: users });
        } catch (error) {
            console.error('Error in getUsers controller:', error);
            this.handleError(res, error);
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json({ status: "success", data: newUser });
        } catch (error) {
            console.error('Error in createUser controller:', error);
            this.handleError(res, error);
        }
    }

    private handleError(res: Response, error: any): void {
        let message = 'Internal server error';
        let status = 500;

        if (error instanceof Error) {
            message = error.message;
            if (error.name === 'ValidationError') {
                status = 400;
            }
        }

        res.status(status).json({ status: "error", message });
    }
}
