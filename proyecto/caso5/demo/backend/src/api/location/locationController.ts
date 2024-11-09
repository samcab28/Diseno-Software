// src/api/location/locationController.ts
import { Request, Response } from "express";
import { LocationService } from "./locationService";
import getPublicIP from "./functions/getIP";

export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    public async getLocation(req: Request, res: Response): Promise<void> {
        try {
            // Get the client IP (static for testing purposes)
            const ip = await getPublicIP();

            // Define the API URL with the access key and IP
            const url = `https://apiip.net/api/check?ip=${ip}&accessKey=cbdc3143-6a0a-44ae-93ec-c596e9147b12`;

            // Make the request with fetch
            const response = await fetch(url);
            const data = await response.json();

            // Return the data from the API response
            res.status(200).json({
                status: "success",
                data: data 
            });
        } catch (error) {
            console.error('Error in getLocation controller:', error);
            this.handleError(res, error);
        }
    }

    public async findNearbyLocations(req: Request, res: Response): Promise<void> {
        try {
            const { latitude, longitude, maxDistance } = req.query;

            // Validar los parámetros
            if (!latitude || !longitude) {
                res.status(400).json({
                    status: "error",
                    message: "Latitude and longitude are required"
                });
                return;
            }

            const userLocation = {
                latitude: parseFloat(latitude as string),
                longitude: parseFloat(longitude as string)
            };

            const maxDistanceNum = maxDistance ? parseFloat(maxDistance as string) : 10;

            const nearbyLocations = await this.locationService.findNearbyLocations(
                userLocation,
                maxDistanceNum
            );

            res.status(200).json({
                status: "success",
                data: nearbyLocations
            });
        } catch (error) {
            console.error('Error in findNearbyLocations controller:', error);
            res.status(500).json({
                status: "error",
                message: error instanceof Error ? error.message : 'Internal server error'
            });
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
