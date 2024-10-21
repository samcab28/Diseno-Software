export class CodeDeliveryDetails {
    private destination: string;
    private deliveryMedium: string;
    private attributeName: string;

    constructor(destination: string, deliveryMedium: string, attributeName: string) {
        this.destination = destination;
        this.deliveryMedium = deliveryMedium;
        this.attributeName = attributeName;
    }

    public getDestination(): string {
        return this.destination;
    }

    public getDeliveryMedium(): string {
        return this.deliveryMedium;
    }

    public getAttributeName(): string {
        return this.attributeName;
    }
}