import {FormulaData} from "../../infrastruture/express/formula/formula-data";
import {FormulaException, FormulaMessageException} from "./formula.exception";
import {ExtraFormula} from "../../domain/formula/extends/extra.formule";
import {FieldPlusEquipmentFormula} from "../../domain/formula/extends/field-plus-equipment.formula";
import {Formula} from "../../domain/formula/formula.model";
import {FieldFormula} from "../../domain/formula/extends/field.formula";

// https://refactoring.guru/fr/design-patterns/strategy
interface FormulaCreationStrategy {
    createFormula(field?: string, equipments?: string[], extras?: string[]): Formula;
}

class FieldFormulaCreationStrategy implements FormulaCreationStrategy {
    createFormula(field: string): Formula {
        return new FieldFormula(field);
    }
}

class FieldPlusMaterialFormulaCreationStrategy implements FormulaCreationStrategy {
    createFormula(field: string, equipments: string[]): Formula {
        return new FieldPlusEquipmentFormula(field, equipments);
    }
}

class ExtraFormulaCreationStrategy implements FormulaCreationStrategy {
    createFormula(field: string, equipments: string[], extras: string[]): Formula {
        return new ExtraFormula(field, equipments, extras);
    }
}


export class FormulaCreationConfig {
    static getStrategy(formula: FormulaData): FormulaCreationStrategy {
        if (formula.field && (formula.equipments.length == 0 && formula.extras.length == 0)) {
            return new FieldFormulaCreationStrategy();
        } else if (formula.field && formula.equipments.length != 0 && formula.extras.length == 0) {
            return new FieldPlusMaterialFormulaCreationStrategy();
        } else if(formula.field && formula.equipments.length != 0 && formula.extras.length != 0){
            return new ExtraFormulaCreationStrategy();
        } else {
            console.log("test")
            throw new FormulaException(FormulaMessageException.BAD_FORMULA);
        }
    }
}

