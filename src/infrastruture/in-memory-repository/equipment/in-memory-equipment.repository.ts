import {EquipmentRepositoryException, EquipmentRepositoryExceptionMessage} from "./equipment.repository-exception";
import {Equipment, EquipmentId} from "../../../domain/equipment/equipment.model";
import {EquipmentRepository} from "../../../domain/equipment/equipment.repository";

const _equipments: Equipment[] = []

export class InMemoryEquipmentRepository implements EquipmentRepository {
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

    async create(equipment: Equipment): Promise<Equipment> {
        _equipments.push(equipment);
        return equipment;
    }

    async delete(id: EquipmentId): Promise<void> {
        const equipment = _equipments.find(equipment => equipment.id.value === id.value);
        if (!equipment) {
            throw new EquipmentRepositoryException(EquipmentRepositoryExceptionMessage.EQUIPMENT_NOT_FOUND);
        }
        equipment.deletedAt = new Date();
    }
}