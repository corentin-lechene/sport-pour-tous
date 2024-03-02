import {IGuaranteeService} from "./guarantee.service.interface";
import {Guarantee, GuaranteeId} from "../../../domain/client/guarantee/guarantee.model";
import {GuaranteeRepository} from "../../../domain/client/guarantee/guarantee.repository";
import {FieldPlusMaterialFormula} from "../../../domain/formula/extends/field-plus-material.formula";

const GUARANTEE_BANK = 10;
const GUARANTEE_MATERIAL = 20;
export class GuaranteeService implements IGuaranteeService {

    constructor(private readonly guaranteeRepository: GuaranteeRepository) {
        this.guaranteeRepository = guaranteeRepository;
    }

    async getAll() {
        return this.guaranteeRepository.getAll();
    }

    async getById(guaranteeId: GuaranteeId) {
        return this.guaranteeRepository.getById(guaranteeId);
    }

    async createBankGuarantee() {
         const guarantee = new Guarantee(GUARANTEE_BANK, "bank");
         return this.guaranteeRepository.create(guarantee);
    }

    createMaterialGuarantee(formula: FieldPlusMaterialFormula): Promise<Guarantee> {
        const guarantee = new Guarantee(GUARANTEE_MATERIAL, "materials", formula);
        return this.guaranteeRepository.create(guarantee);
    }
}