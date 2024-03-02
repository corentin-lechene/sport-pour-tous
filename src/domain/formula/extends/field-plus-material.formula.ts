import {Formula} from "../formula.model";
import {Equipment} from "../../equipment/equipment.model";

const FORMULA_NAME = "Field Location + Equipments";
const FORMULA_DESCRIPTION = "Field Location + Equipments";
const FORMULA_PRICE = 20;
export class FieldPlusMaterialFormula extends Formula {
    field: string;
    equipments: string[] | Equipment[];

    constructor(field: string, equipments: string[] | Equipment[]) {
        super(FORMULA_NAME, FORMULA_DESCRIPTION, FORMULA_PRICE);
        this.equipments = equipments;
        this.field = field;
    }
}