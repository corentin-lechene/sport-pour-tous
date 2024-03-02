import {v4 as uuidv4} from "uuid";

export class FormulaId {
    value: string;

    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export class Formula {
    id: FormulaId;
    name: string;
    description: string;
    price: number;

    createdAt?: Date;
    deletedAt?: Date;

    constructor(name: string, description: string, price: number) {
        this.id = new FormulaId();
        this.name = name;
        this.description = description;
        this.price = price;
    }
}