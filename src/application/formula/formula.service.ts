import {Formula} from "../../domain/formula/formula.model";
import {FormulaData} from "../../infrastruture/express/formula/formula-data";
import {FormulaRepository} from "../../domain/formula/formula.repository";
import {FormulaException, FormulaMessageException} from "./formula.exception";
import {FieldFormula} from "../../domain/formula/extends/field.formula";
import {FieldPlusMaterialFormula} from "../../domain/formula/extends/field-plus-material.formula";
import {ExtraFormula} from "../../domain/formula/extends/extra.formule";
import {IEquipmentService} from "../equipment/equipment.service.interface";
import {Equipment, EquipmentId} from "../../domain/equipment/equipment.model";
import {IFormulaService} from "./formula.service.interface";
import {EquipmentException} from "../equipment/exception/equipment.exception";

// https://refactoring.guru/fr/design-patterns/strategy
interface FormulaCreationStrategy {
    createFormula(field: string, equipments: string[], extras: string[]): Formula;
}

class FieldFormulaCreationStrategy implements FormulaCreationStrategy {
    createFormula(field: string): Formula {
        return new FieldFormula(field);
    }
}

class FieldPlusMaterialFormulaCreationStrategy implements FormulaCreationStrategy {
    createFormula(field: string, equipments: string[]): Formula {
        return new FieldPlusMaterialFormula(field, equipments);
    }
}

class ExtraFormulaCreationStrategy implements FormulaCreationStrategy {
    createFormula(field: string, equipments: string[], extras: string[]): Formula {
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
        private readonly IEquipmentService: IEquipmentService,
    ) {
        this.formulaRepository = formulaRepository;
    }

    async create(formulaData: FormulaData) {
        const strategy = FormulaCreationConfig.getStrategy(formulaData);
        let formula = strategy.createFormula(formulaData.field, formulaData.equipments, formulaData.extras);

        // todo : => getFieldById
        if(formula instanceof FieldPlusMaterialFormula || formula instanceof ExtraFormula) {
            const ids = formula.equipments.filter(id => typeof id === "string") as string[];
            formula.equipments = await this.loadEquipments(ids);
        }

        return await this.formulaRepository.create(formula);
    }

    async loadEquipments(ids: string[]): Promise<Equipment[]> {
        const equipmentIds = ids.map(id => new EquipmentId(id));

        try {
            return await this.IEquipmentService.getByIds(equipmentIds);
        } catch (e) {
            if(e instanceof EquipmentException) {
                throw new Error(e.message);
            }

            throw new FormulaException(FormulaMessageException.CANNOT_LOAD_EQUIPMENT);
        }
    }

}