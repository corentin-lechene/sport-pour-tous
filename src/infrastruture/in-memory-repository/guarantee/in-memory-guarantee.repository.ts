import {Guarantee, GuaranteeId} from "../../../domain/client/guarantee/guarantee.model";
import {GuaranteeRepository} from "../../../domain/client/guarantee/guarantee.repository";
import {GuaranteeExceptionRepository, GuaranteeMessageExceptionRepository} from "./guarantee.exception.repository";

const _guarantees: Guarantee[] = []

export class InMemoryGuaranteeRepository implements GuaranteeRepository {

    async getAll(): Promise<Guarantee[]> {
        return _guarantees.filter(guarantee => !guarantee.deletedAt);
    }

    async getById(id: GuaranteeId): Promise<Guarantee> {
        const guarantee = _guarantees.find(guarantee => guarantee.id.value === id.value);
        if (!guarantee) {
            throw new GuaranteeExceptionRepository(GuaranteeMessageExceptionRepository.GUARANTEE_NOT_FOUND);
        }
        return guarantee;
    }

    async create(guarantee: Guarantee): Promise<Guarantee> {
        guarantee.createdAt = new Date();
        _guarantees.push(guarantee);
        return guarantee;
    }
}