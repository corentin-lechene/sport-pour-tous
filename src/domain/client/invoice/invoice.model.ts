import {v4 as uuidv4} from "uuid";
import {UserId} from "../user/user.model";

export class InvoiceId {
    value: string;

    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export enum Status {
    NOT_PAYED,
    PAYED

}
export class Invoice {
    id: InvoiceId;
    userId: UserId;
    // sessionId: SessionId;
    amount: number;
    total: number;
    status: Status;

    paidAt?: Date
    deletedAt?: Date
    createdAt?: Date


    constructor(userId: UserId, amount: number, total: number, status: Status) {
        this.id = new InvoiceId();
        this.userId = userId;
        this.amount = amount;
        this.total = total; // todo : what it is ?
        this.status = status;
    }
}