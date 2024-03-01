import {InvoiceRepository} from "../../../domain/client/invoice/invoice.repository";
import {Invoice, InvoiceId, Status} from "../../../domain/client/invoice/invoice.model";
import {UserId} from "../../../domain/client/user/user.model";
import {InvoiceExceptionRepository, InvoiceMessageExceptionRepository} from "./invoice.exception.repository";

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
        return _invoices.filter(invoice => invoice.userId.value === userId.value);
    }

    async create(invoice: Invoice): Promise<Invoice> {
        invoice.createdAt = new Date();
        _invoices.push(invoice);
        return invoice;
    }

    async getByUserAndBySession(userId: UserId /*sessionId: SessionId*/): Promise<Invoice | undefined> {
        return  _invoices.find(invoice => invoice.userId.value === userId.value /*&& invoice.sessionId.value === sessionId.value*/);
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
        return invoice;
    }

}