import {v4 as uuidv4} from "uuid";
import {FieldPlusEquipmentFormula} from "../../formula/extends/field-plus-equipment.formula";
import {User} from "../user/user.model";

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
    formula?: FieldPlusEquipmentFormula
    user: User;
    // todo: equipment ??

    deletedAt?: Date;
    createdAt?: Date;


    constructor(amount: number, type: GuaranteeType, user: User, formula?: FieldPlusEquipmentFormula) {
        this.id = new GuaranteeId();
        this.amount = amount;
        this.type = type;
        this.user = user;
        if(formula) this.formula = formula;
    }
}