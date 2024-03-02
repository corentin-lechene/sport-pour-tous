import {EquipmentRepository} from "../../domain/equipment/equipment.repository";
import {Equipment, EquipmentId} from "../../domain/equipment/equipment.model";
import {EquipmentTypeId} from "../../domain/equipment/equipmentType/equipment-type.model";
import {EquipmentTypeRepository} from "../../domain/equipment/equipmentType/equipment-type.repository";
import {IEquipmentService} from "./equipment.service.interface";
import {EquipmentException, EquipmentMessageError} from "./equipment.exception";

export class EquipmentService implements IEquipmentService {
    constructor(
        private readonly equipmentRepository: EquipmentRepository,
        private readonly equipmentTypeRepository: EquipmentTypeRepository
    ) {
        this.equipmentRepository = equipmentRepository;
    }

    async getAll() {
        return this.equipmentRepository.getAll();
    }

    async getById(equipmentId: EquipmentId) {
        return this.equipmentRepository.getById(equipmentId);
    }

    async create(name: string, quantity: number, equipmentTypeId: EquipmentTypeId) {
        if(!name || !quantity || !equipmentTypeId) {
            throw new EquipmentException(EquipmentMessageError.ALL_FIELDS_MUST_BE_FILL);
        }

        const equipmentType = await this.equipmentTypeRepository.getById(equipmentTypeId);

        const newEquipment = new Equipment(name, quantity, equipmentType);
        return this.equipmentRepository.create(newEquipment);
    }

    async delete(equipmentId: EquipmentId) {
        return this.equipmentRepository.delete(equipmentId);
    }

    async getByIds(equipmentIds: EquipmentId[]): Promise<Equipment[]> {
        return this.equipmentRepository.getByIds(equipmentIds);
    }
}