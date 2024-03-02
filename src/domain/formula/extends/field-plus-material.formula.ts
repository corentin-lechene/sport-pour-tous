import {Formula} from "../formula.model";

const FORMULA_NAME = "Field Location + Equipments";
const FORMULA_DESCRIPTION = "Field Location + Equipments";
const FORMULA_PRICE = 20;
export class FieldPlusMaterialFormula extends Formula {
    field: string;
    equipments: string[];

    constructor(field: string, equipments: string[]) {
        super(FORMULA_NAME, FORMULA_DESCRIPTION, FORMULA_PRICE);
        this.equipments = equipments;
        this.field = field;
    }
}