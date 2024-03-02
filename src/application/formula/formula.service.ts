import {FormulaData} from "../../infrastruture/express/formula/formula-data";
import {FormulaRepository} from "../../domain/formula/formula.repository";
import {FormulaException, FormulaMessageException} from "./formula.exception";
import {FieldPlusEquipmentFormula} from "../../domain/formula/extends/field-plus-equipment.formula";
import {ExtraFormula} from "../../domain/formula/extends/extra.formule";
import {IEquipmentService} from "../equipment/equipment.service.interface";
import {Equipment, EquipmentId} from "../../domain/equipment/equipment.model";
import {IFormulaService} from "./formula.service.interface";
import {FormulaCreationConfig} from "./formula.strategy";
import {EquipmentException} from "../equipment/equipment.exception";


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
        //todo : equipment
        if(formula instanceof FieldPlusEquipmentFormula || formula instanceof ExtraFormula) {
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