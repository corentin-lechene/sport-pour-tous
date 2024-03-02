import {InvoiceRepository} from "../../../domain/client/invoice/invoice.repository";
import {Invoice, InvoiceId, Status} from "../../../domain/client/invoice/invoice.model";
import {UserId} from "../../../domain/client/user/user.model";
import {InvoiceExceptionRepository, InvoiceMessageExceptionRepository} from "./invoice.exception.repository";
import {SessionId} from "../../../domain/session/session-id";

const _invoices: Invoice[] = []

export class InMemoryInvoiceRepository implements InvoiceRepository {
    async getAll(): Promise<Invoice[]> {
        return _invoices.filter(invoice => !invoice.deletedAt);
    }

    async getById(invoiceId: InvoiceId): Promise<Invoice> {
        const invoice = _invoices.find(invoice => invoice.id.value === invoiceId.value);
        if(!invoice) throw new InvoiceExceptionRepository(InvoiceMessageExceptionRepository.INVOICE_NOT_FOUND);
        return invoice;
    }

    async getAllByUser(userId: UserId): Promise<Invoice[]> {
        return _invoices.filter(invoice => invoice.user.id.value === userId.value);
    }

    async create(invoice: Invoice): Promise<Invoice> {
        invoice.createdAt = new Date();
        _invoices.push(invoice);
        return invoice;
    }

    async getByUserAndSession(userId: UserId, sessionId: SessionId): Promise<Invoice | undefined> {
        return _invoices.find(invoice => invoice.user.id.value === userId.value && invoice.session.id.value === sessionId.value);
    }

    async delete(invoiceId: InvoiceId): Promise<void> {
        const invoice = _invoices.find(invoice => invoice.id.value === invoiceId.value);
        if (!invoice) {
            throw new InvoiceExceptionRepository(InvoiceMessageExceptionRepository.INVOICE_NOT_FOUND);
        }
        invoice.deletedAt = new Date();
    }

    async updateStatus(invoiceId: InvoiceId, status: Status): Promise<Invoice> {
        const invoice = _invoices.find(invoice => invoice.id.value === invoiceId.value);
        if (!invoice) {
            throw new InvoiceExceptionRepository(InvoiceMessageExceptionRepository.INVOICE_NOT_FOUND);
        }
        invoice.status = status;
        if(status === Status.PAYED) invoice.paidAt = new Date();

        return invoice;
    }
}