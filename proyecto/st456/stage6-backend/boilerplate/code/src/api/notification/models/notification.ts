import { NotificationType } from './notificationType';

export class Notification {
    public id: string;
    public type: NotificationType;
    public content: string;
    public recipient: string;
    public metadata: Map<string, string>;
    public timestamp: Date;

    constructor(id: string, type: NotificationType, content: string, recipient: string) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.recipient = recipient;
        this.metadata = new Map<string, string>();
        this.timestamp = new Date();
    }

    public setMetadata(key: string, value: string): void {
        this.metadata.set(key, value);
    }

    public getMetadata(key: string): string | undefined {
        return this.metadata.get(key);
    }
}