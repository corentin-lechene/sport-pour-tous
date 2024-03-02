import {EquipmentRepositoryException, EquipmentRepositoryExceptionMessage} from "./equipment.repository-exception";
import {Equipment, EquipmentId} from "../../../domain/equipment/equipment.model";
import {EquipmentRepository} from "../../../domain/equipment/equipment.repository";
import {EquipmentType} from "../../../domain/equipment/equipmentType/equipment-type.model";

export const _equipments: Equipment[] = []

export class InMemoryEquipmentRepository implements EquipmentRepository {
    constructor() {
        const equipmentType = new EquipmentType("balle");

        const equipment = new Equipment("nom", 10, equipmentType);

        _equipments.push(equipment);
    }
    async getAll(): Promise<Equipment[]> {
        return _equipments.filter(equipment => !equipment.deletedAt);
    }

    async getById(id: EquipmentId): Promise<Equipment> {
        const equipment = _equipments.find(equipment => equipment.id.value === id.value);
        if (!equipment) {
            throw new EquipmentRepositoryException(EquipmentRepositoryExceptionMessage.EQUIPMENT_NOT_FOUND);
        }
        return equipment;
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

    async create(equipment: Equipment): Promise<Equipment> {
        _equipments.push(equipment);
        return equipment;
    }

    async delete(id: EquipmentId): Promise<void> {
        const equipment = _equipments.find(equipment => equipment.id.value === id.value);
        if (!
            equipment
        ) {
            throw new EquipmentRepositoryException(EquipmentRepositoryExceptionMessage.EQUIPMENT_NOT_FOUND);
        }
        equipment.deletedAt = new Date();
    }
}