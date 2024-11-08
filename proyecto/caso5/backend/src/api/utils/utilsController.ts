import { Request, Response } from "express";
import {getUserLocation} from "./location/getLocation"

export class UtilsController {

    public async setLocation(req: Request, res: Response): Promise<void> {
        try {
            const { longitude, latitude } = req.body;
            res.status(200).json({ status: "success", data: { longitude, latitude } });
        } catch (error) {
            console.error("Error in setLocation controller:", error);
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
