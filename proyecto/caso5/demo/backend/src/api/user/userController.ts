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

    public async addFavorite(req: Request, res: Response): Promise<void> {
        try {
            const { userID, cuidadorID } = req.body;  // Extraemos de req.body
    
            if (isNaN(userID)) {
                res.status(400).json({ status: "error", message: "Invalid user ID" });
                return;
            }

            if (isNaN(cuidadorID)) {
                res.status(400).json({ status: "error", message: "Invalid cuidador ID" });
                return;
            }
    
            const newFavorite = await this.userService.addFavorite(userID, cuidadorID);
            res.status(200).json({ status: "success", data: newFavorite });
        } catch (error) {
            console.error('Error in addFavorite controller:', error);
            this.handleError(res, error);
        }
    }
    

    public async getFavoritesByUserID(req: Request, res: Response): Promise<void> {
        try {
            const userID = parseInt(req.params.userID, 10);
            if (isNaN(userID)) {
                res.status(400).json({ status: "error", message: "Invalid user ID" });
                return;
            }
    
            const favorites = await this.userService.getFavoritesByUserID(userID);
            res.status(200).json({ status: "success", data: favorites });
        } catch (error) {
            console.error('Error in getFavoritesByUserID controller:', error);
            this.handleError(res, error);
        }
    }

    public async deleteFavorite(req: Request, res: Response): Promise<void> {
        try {
            const userID = parseInt(req.params.userID, 10);
            const cuidadorID = parseInt(req.params.cuidadorID, 10);
            
            if (isNaN(userID) || isNaN(cuidadorID)) {
                res.status(400).json({ status: "error", message: "Invalid user or cuidador ID" });
                return;
            }
    
            await this.userService.deleteFavorite(userID, cuidadorID);
            res.status(200).json({ status: "success", message: "Favorite marked as deleted" });
        } catch (error) {
            console.error('Error in deleteFavorite controller:', error);
            this.handleError(res, error);
        }
    }
    
    public async searchAdditionalServices(req: Request, res: Response): Promise<void> {
        try {
            const { keywords } = req.body;
            if (!Array.isArray(keywords) || keywords.length === 0) {
                res.status(400).json({ status: "error", message: "Keywords must be provided and must be an array" });
                return;
            }
    
            const results = await this.userService.searchAdditionalServices(keywords);
            res.status(200).json({ status: "success", data: results });
        } catch (error) {
            console.error('Error in searchAdditionalServices controller:', error);
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
