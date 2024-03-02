import {UserId} from "../../../domain/client/user/user.model";
import {Invoice} from "../../../domain/client/invoice/invoice.model";
import {SessionId} from "../../../domain/session/session.model";
import {Guarantee} from "../../../domain/client/guarantee/guarantee.model";

export interface IInvoiceService {
    getByUser(userId: UserId): Promise<Invoice[]>;
    create(userId: UserId, sessionId: SessionId, amount: number, total: number, guarantee: Guarantee[]): Promise<Invoice>;
}