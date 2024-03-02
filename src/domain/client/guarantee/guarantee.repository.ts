import {Guarantee, GuaranteeId} from "./guarantee.model";

export interface GuaranteeRepository {
    getAll(): Promise<Guarantee[]>;
    getById(guaranteeId: GuaranteeId): Promise<Guarantee>;
    create(guarantee: Guarantee): Promise<Guarantee>;
    delete(guaranteeId: GuaranteeId): Promise<void>;
}