import {v4 as uuidv4} from "uuid";
import {FieldPlusMaterialFormula} from "../../formula/extends/field-plus-material.formula";

export type GuaranteeType = "materials" | "bank";

export class GuaranteeId {
    value: string;

    constructor(value: string = uuidv4()) {
        this.value = value;
    }
}

export class Guarantee {
    id: GuaranteeId;
    amount: number;
    type: GuaranteeType;
    formula?: FieldPlusMaterialFormula
    // todo: equipment ??

    deletedAt?: Date;
    createdAt?: Date;


    constructor(amount: number, type: GuaranteeType, formula?: FieldPlusMaterialFormula) {
        this.id = new GuaranteeId();
        this.amount = amount;
        this.type = type;
        if(formula) this.formula = formula;
    }
}