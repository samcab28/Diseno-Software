export class User {
    private username: string;
    private email: string;
    private phoneNumber: string;
    private attributes: Map<string, string>;

    constructor(username: string, email: string, phoneNumber: string) {
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.attributes = new Map();
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public getAttribute(key: string): string | undefined {
        return this.attributes.get(key);
    }

    public setAttribute(key: string, value: string): void {
        this.attributes.set(key, value);
    }
}