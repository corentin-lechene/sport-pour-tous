import {IGuaranteeService} from "./guarantee.service.interface";
import {Guarantee, GuaranteeId} from "../../../domain/client/guarantee/guarantee.model";
import {GuaranteeRepository} from "../../../domain/client/guarantee/guarantee.repository";
import {FieldPlusEquipmentFormula} from "../../../domain/formula/extends/field-plus-equipment.formula";
import {User} from "../../../domain/client/user/user.model";
import {Formula} from "../../../domain/formula/formula.model";

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

    async getAboutSubscription(formula: Formula, user: User): Promise<Guarantee[]> {
        const guarantees: Guarantee[] = [];

        if(formula instanceof FieldPlusEquipmentFormula) {
            const guarantee = await this.createMaterialGuarantee(formula, user);
            guarantees.push(guarantee);
        }

        if(user.isFirstTime) {
            const guarantee = await this.createBankGuarantee(user);
            guarantees.push(guarantee);
        }

        return guarantees;
    }

    async createBankGuarantee(user: User) {
         const guarantee = new Guarantee(GUARANTEE_BANK, "bank", user);
         return this.guaranteeRepository.create(guarantee);
    }

    async createMaterialGuarantee(formula: FieldPlusEquipmentFormula, user: User): Promise<Guarantee> {
        const guarantee = new Guarantee(GUARANTEE_MATERIAL, "materials", user, formula);
        return this.guaranteeRepository.create(guarantee);
    }

    delete(guaranteeId: GuaranteeId): Promise<void> {
        return this.guaranteeRepository.delete(guaranteeId);
    }


}