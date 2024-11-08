export class SignInResult {
    private accessToken: string;
    private idToken: string;
    private refreshToken: string;
    private expiresIn: number;

    constructor(accessToken: string, idToken: string, refreshToken: string, expiresIn: number) {
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public getIdToken(): string {
        return this.idToken;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public getExpiresIn(): number {
        return this.expiresIn;
    }
}