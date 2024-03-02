import {User, UserId} from "../../../domain/client/user/user.model";
import {Invoice, InvoiceId} from "../../../domain/client/invoice/invoice.model";
import {Session, SessionId} from "../../../domain/session/session.model";
import {Guarantee} from "../../../domain/client/guarantee/guarantee.model";

export interface IInvoiceService {
    getByUser(userId: UserId): Promise<Invoice[]>;
    getBySessionAndUser(session: SessionId, userId: UserId): Promise<Invoice | undefined>;
    create(user: User, session: Session, amount: number, total: number, guarantee: Guarantee[]): Promise<Invoice>;
    delete(invoiceId: InvoiceId): Promise<void>;
}