export class UserAttributes {
    private email: string;
    private phoneNumber: string;
    private name: string;
    private birthdate: string;
    private address: string;

    constructor(email: string, phoneNumber: string, name: string, birthdate: string, address: string) {
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.birthdate = birthdate;
        this.address = address;
    }

    public toMap(): Map<string, string> {
        const map = new Map<string, string>();
        map.set('email', this.email);
        map.set('phone_number', this.phoneNumber);
        map.set('name', this.name);
        map.set('birthdate', this.birthdate);
        map.set('address', this.address);
        return map;
    }

    public static fromMap(map: Map<string, string>): UserAttributes {
        return new UserAttributes(
            map.get('email') || '',
            map.get('phone_number') || '',
            map.get('name') || '',
            map.get('birthdate') || '',
            map.get('address') || ''
        );
    }
}