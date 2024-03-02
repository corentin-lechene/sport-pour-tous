import {FormulaData} from "../../infrastruture/express/formula/formula-data";
import {Formula} from "../../domain/formula/formula.model";

export interface IFormulaService {
    create(formula: FormulaData): Promise<Formula>;
}