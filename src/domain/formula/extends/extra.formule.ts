import {Formula} from "../formula.model";
import {Field} from "../../place/field/field.model";

const FORMULA_NAME = "All + extras";
const FORMULA_DESCRIPTION = "All + extras";
const FORMULA_PRICE = 30;
export class ExtraFormula extends Formula {
    field: string | Field;
    equipments: string[];
    extras: string[];

    constructor(field: string | Field, equipments: string[], extras: string[]) {
        super(FORMULA_NAME, FORMULA_DESCRIPTION, FORMULA_PRICE);
        this.extras = extras;
        this.field = field;
        this.equipments = equipments;
    }
}