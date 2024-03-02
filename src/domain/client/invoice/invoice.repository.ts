import {Invoice, InvoiceId, Status} from "./invoice.model";
import {UserId} from "../user/user.model";
import {SessionId} from "../../session/session.model";

export interface InvoiceRepository {
    getAll() : Promise<Invoice[]>,
    getById(invoiceId: InvoiceId) : Promise<Invoice>,
    getAllByUser(userId: UserId) : Promise<Invoice[]>,
    getByUserAndBySession(userId: UserId, sessionId: SessionId) : Promise<Invoice | undefined>,
    create(invoice: Invoice) : Promise<Invoice>,
    delete(invoiceId: InvoiceId) : Promise<void>,
    updateStatus(invoiceId: InvoiceId, status: Status) : Promise<Invoice>,
}