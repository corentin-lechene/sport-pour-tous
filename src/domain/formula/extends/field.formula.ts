import {Formula} from "../formula.model";

const FORMULA_NAME = "Field Location";
const FORMULA_DESCRIPTION = "Field Location";
const FORMULA_PRICE = 10;
export class FieldFormula extends Formula {
    field: string;

    constructor(field: string) {
        super(FORMULA_NAME, FORMULA_DESCRIPTION, FORMULA_PRICE);
        this.field = field;
    }
}