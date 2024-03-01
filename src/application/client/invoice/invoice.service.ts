import {InvoiceRepository} from "../../../domain/client/invoice/invoice.repository";
import {UserId} from "../../../domain/client/user/user.model";
import {IInvoiceService} from "./invoice.service.interface";
import {InvoiceException, InvoiceMessageException} from "./invoice.exception";
import {Invoice, InvoiceId, Status} from "../../../domain/client/invoice/invoice.model";

export class InvoiceService implements IInvoiceService {
    constructor(private readonly invoiceRepository: InvoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    async getAll() {
        return this.invoiceRepository.getAll();
    }

    async getById() {
        return this.invoiceRepository.getAll();
    }

    async create(userId: UserId, /*sessionId: SessionId,*/ amount: number) {
         if(amount <= 0) {
             throw new InvoiceException(InvoiceMessageException.AMOUNT_ZERO_OR_LOWER);
         }
         // todo : implement sessionId
        const invoiceExisted = await this.invoiceRepository.getByUserAndBySession(userId /*,sessionId*/)

        if(invoiceExisted) {
            throw new InvoiceException(InvoiceMessageException.INVOICE_ALREADY_EXIST_FOR_THE_USER_AND_SESSION);
        }

         const invoice = new Invoice(userId, amount, amount, Status.NOT_PAYED);
         return this.invoiceRepository.create(invoice);
    }

    async payedInvoice(invoiceId: InvoiceId) {
        const invoiceExisted = await this.invoiceRepository.getById(invoiceId)

        if(!invoiceExisted) {
            throw new InvoiceException(InvoiceMessageException.INVOICE_NOT_FOUND);
        }

        return this.invoiceRepository.updateStatus(invoiceId, Status.PAYED);
    }

    async delete(invoiceId: InvoiceId) {
         return this.invoiceRepository.delete(invoiceId);
    }

    /**
     * IInvoiceService => méthode pour d'autres domaine
     * */
    async getByUser(userId: UserId) {
        return this.invoiceRepository.getAllByUser(userId);
    }
}