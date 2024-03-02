import {Formula} from "./formula.model";

export interface FormulaRepository {
    create(formula: Formula): Promise<Formula>;
    getAll(): Promise<Formula[]>;
}