import {v4 as uuidv4} from "uuid";
import {User} from "../user/user.model";
import {Session} from "../../session/session.model";
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
    user: User;
    session: Session;
    amount: number;
    total: number;
    status: Status;
    guarantees: Guarantee[];

    paidAt?: Date
    deletedAt?: Date
    createdAt?: Date


    constructor(user: User, session: Session, amount: number, total: number, status: Status, guarantees: Guarantee[]) {
        this.id = new InvoiceId();
        this.user = user;
        this.session = session;
        this.amount = amount;
        this.total = total;
        this.status = status;
        this.guarantees = guarantees;
    }
}