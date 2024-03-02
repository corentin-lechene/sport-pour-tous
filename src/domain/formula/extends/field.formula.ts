import {Formula} from "../formula.model";
import {Field} from "../../place/field/field.model";

const FORMULA_NAME = "Field Location";
const FORMULA_DESCRIPTION = "Field Location";
const FORMULA_PRICE = 10;
export class FieldFormula extends Formula {
    field: string | Field;

    constructor(field: string | Field) {
        super(FORMULA_NAME, FORMULA_DESCRIPTION, FORMULA_PRICE);
        this.field = field;
    }
}