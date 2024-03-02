import {Formula} from "../../domain/formula/formula.model";
import {FormulaData} from "../../infrastruture/express/formula/formula-data";
import {IFormulaService} from "./formula.service.interface";
import {FormulaRepository} from "../../domain/formula/formula.repository";
import {FormulaException, FormulaMessageException} from "./formula.exception";
import {FieldFormula} from "../../domain/formula/extends/field.formula";
import {FieldPlusMaterialFormula} from "../../domain/formula/extends/field-plus-material.formula";
import {ExtraFormula} from "../../domain/formula/extends/extra.formule";
import {IEquipmentService} from "../equipment/equipment.service.interface";
import {Equipment, EquipmentId} from "../../domain/equipment/equipment.model";

interface FormulaCreationStrategy {
    getFormula(field: string, equipments?: string[], extras?: string[]): Formula;
}

class FieldFormulaCreationStrategy implements FormulaCreationStrategy {
    getFormula(field: string): Formula {
        return new FieldFormula(field);
    }
}

class FieldPlusMaterialFormulaCreationStrategy implements FormulaCreationStrategy {
    getFormula(field: string, equipments: string[]): Formula {
        return new FieldPlusMaterialFormula(field, equipments);
    }
}

class ExtraFormulaCreationStrategy implements FormulaCreationStrategy {
    getFormula(field: string, equipments: string[], extras: string[]): Formula {
        return new ExtraFormula(field, equipments, extras);
    }
}

class FormulaCreationConfig {
    static getStrategy(formula: FormulaData): FormulaCreationStrategy {
        if (formula.field && (formula.equipments.length == 0 && formula.extras.length == 0)) {
            return new FieldFormulaCreationStrategy();
        } else if (formula.field && formula.equipments.length != 0 && formula.extras.length == 0) {
            return new FieldPlusMaterialFormulaCreationStrategy();
        } else if(formula.field && formula.equipments.length != 0 && formula.extras.length != 0){
            return new ExtraFormulaCreationStrategy();
        } else {
            throw new FormulaException(FormulaMessageException.BAD_FORMULA);
        }
    }
}

export class FormulaService implements IFormulaService {
    constructor(
        private readonly formulaRepository: FormulaRepository,
        private readonly IEquipmentService: IEquipmentService
    ) {
        this.formulaRepository = formulaRepository;
    }

    async create(formulaData: FormulaData) {
        const strategy = FormulaCreationConfig.getStrategy(formulaData);
        const formula = strategy.getFormula(formulaData.field, formulaData.equipments, formulaData.extras);


        // todo : => getFieldById

        const equipments : Equipment[] = [];
        for (const id of formulaData.equipments) {
            const equipment = await this.IEquipmentService.getById(new EquipmentId(id));
            equipments.push(equipment)
        }


        return await this.formulaRepository.create(formula);
    }
}