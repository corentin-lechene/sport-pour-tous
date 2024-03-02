import {FormulaData} from "../../infrastruture/express/formula/formula-data";
import {FormulaRepository} from "../../domain/formula/formula.repository";
import {FormulaException, FormulaMessageException} from "./formula.exception";
import {FieldPlusEquipmentFormula} from "../../domain/formula/extends/field-plus-equipment.formula";
import {ExtraFormula} from "../../domain/formula/extends/extra.formule";
import {IEquipmentService} from "../equipment/equipment.service.interface";
import {Equipment, EquipmentId} from "../../domain/equipment/equipment.model";
import {IFormulaService} from "./formula.service.interface";
import {FormulaCreationConfig} from "./formula.strategy";
import {IFieldService} from "../place/field/field.service.interface";
import {FieldFormula} from "../../domain/formula/extends/field.formula";
import {FormulaId} from "../../domain/formula/formula.model";

export class FormulaService implements IFormulaService {
    constructor(
        private readonly formulaRepository: FormulaRepository,
        private readonly IEquipmentService: IEquipmentService,
        private readonly IFieldService: IFieldService,
    ) {
        this.formulaRepository = formulaRepository;
    }

    async create(formulaData: FormulaData) {
        const strategy = FormulaCreationConfig.getStrategy(formulaData);
        let formula = strategy.createFormula(formulaData.field, formulaData.equipments, formulaData.extras);

        // todo : => getFieldById
        if(formula instanceof FieldPlusEquipmentFormula || formula instanceof ExtraFormula) {
            const ids = formula.equipments.filter(id => typeof id === "string") as string[];
            formula.equipments = await this.loadEquipments(ids);
        }

        if(formula instanceof FieldPlusEquipmentFormula || formula instanceof ExtraFormula || formula instanceof FieldFormula) {
            if(typeof formula.field === "string") {
                formula.field = await this.IFieldService.fetchById(new FormulaId(formula.field));
            }

        }

        return await this.formulaRepository.create(formula);
    }

    async loadEquipments(ids: string[]): Promise<Equipment[]> {
        const equipmentIds = ids.map(id => new EquipmentId(id));
        const equipments =  await this.IEquipmentService.getByIds(equipmentIds);
        if(equipments.length == 0) {
            throw new FormulaException(FormulaMessageException.CANNOT_LOAD_EQUIPMENT);
        }

        return equipments;
    }
}