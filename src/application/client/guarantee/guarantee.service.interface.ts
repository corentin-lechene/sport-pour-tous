import {Guarantee} from "../../../domain/client/guarantee/guarantee.model";
import {FieldPlusMaterialFormula} from "../../../domain/formula/extends/field-plus-material.formula";

export interface IGuaranteeService {
    createBankGuarantee(): Promise<Guarantee>;
    createMaterialGuarantee(formula: FieldPlusMaterialFormula): Promise<Guarantee>;
}