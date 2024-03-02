// todo : validation
export class Address {
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly postalCode: string;

    constructor(street: string, city: string, state: string, postalCode: string) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }

    equals(other: Address): boolean {
        return this.street === other.street &&
            this.city === other.city &&
            this.state === other.state &&
            this.postalCode === other.postalCode;
    }

    toString(): string {
        return `${this.street}, ${this.city}, ${this.state}, ${this.postalCode}`;
    }
}