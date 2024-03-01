import {UserId} from "../../../domain/client/user/user.model";
import {Invoice} from "../../../domain/client/invoice/invoice.model";

export interface IInvoiceService {
    getByUser(userId: UserId): Promise<Invoice[]>;
}