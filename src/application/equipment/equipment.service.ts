import {EquipmentRepository} from "../../domain/equipment/equipment.repository";
import {Equipment, EquipmentId} from "../../domain/equipment/equipment.model";
import {EquipmentTypeId} from "../../domain/equipment/equipmentType/equipment-type.model";
import {EquipmentException, EquipmentMessageError} from "./exception/equipment.exception";
import {IEquipmentTypeService} from "./equipmentType/activity.service-interface";
import {IEquipmentService} from "./equipment.service.interface";
import {
    EquipmentRepositoryException,
    EquipmentRepositoryExceptionMessage
} from "../../infrastruture/in-memory-repository/equipment/equipment.exception";
import {_equipments} from "../../infrastruture/in-memory-repository/equipment/in-memory-equipment.repository";

export class EquipmentService implements IEquipmentService{
    constructor(
        private readonly equipmentRepository: EquipmentRepository,
        private readonly equipmentTypeService: IEquipmentTypeService,
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

        const equipmentType = await this.equipmentTypeService.getEquipmentById(equipmentTypeId);

        const newEquipment = new Equipment(name, quantity, equipmentType);
        return this.equipmentRepository.create(newEquipment);
    }

    async delete(equipmentId: EquipmentId) {
        return this.equipmentRepository.delete(equipmentId);
    }

    async getByIds(equipmentIds: EquipmentId[]): Promise<Equipment[]> {
        const equipments = _equipments
            .filter(equipment => !equipment.deletedAt)
            .filter(equipment => equipmentIds
                .some(equipmentId => equipmentId.value === equipment.id.value)
            );
        if (equipmentIds.length !== equipmentIds.length) {
            throw new EquipmentRepositoryException(EquipmentRepositoryExceptionMessage.EQUIPMENT_NOT_FOUND);
        }
        return equipments;
    }
}