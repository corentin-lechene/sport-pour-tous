import {v4 as uuidv4} from "uuid";
import {UserId} from "../user/user.model";
import {SessionId} from "../../session/session.model";
import {Guarantee} from "../guarantee/guarantee.model";

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
    sessionId: SessionId;
    amount: number;
    total: number;
    status: Status;
    guarantee: Guarantee[];

    paidAt?: Date
    deletedAt?: Date
    createdAt?: Date


    constructor(userId: UserId, amount: number, total: number, status: Status, guarantee: Guarantee[]) {
        this.id = new InvoiceId();
        this.userId = userId;
        this.amount = amount;
        this.total = total;
        this.status = status;
        this.guarantee = guarantee;
    }
}