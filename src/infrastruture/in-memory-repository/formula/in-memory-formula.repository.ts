import {FormulaRepository} from "../../../domain/formula/formula.repository";
import {Formula} from "../../../domain/formula/formula.model";

const _formulas: Formula[] = []

export class InMemoryFormulaRepository implements FormulaRepository {
    async create(formula: Formula): Promise<Formula> {
        formula.createdAt = new Date();

        _formulas.push(formula);
        return formula;
    }

    async getAll(): Promise<Formula[]> {
        return _formulas.filter(formula => !formula.deletedAt);
    }

}