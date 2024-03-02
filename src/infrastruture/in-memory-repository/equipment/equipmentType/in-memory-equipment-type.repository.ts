import {
    EquipmentTypeRepositoryException,
    EquipmentTypeRepositoryExceptionMessage
} from "./equipment-type.repository-exception";
import {EquipmentType, EquipmentTypeId} from "../../../../domain/equipment/equipmentType/equipment-type.model";
import {EquipmentTypeRepository} from "../../../../domain/equipment/equipmentType/equipment-type.repository";
import {
    EquipmentTypeException
} from "../../../../application/equipment/equipmentType/exception/equipment-type.exception";
import {
    EquipmentTypeMessageError
} from "../../../../application/equipment/equipmentType/exception/equipment-type.message-error";

const _equipmentTypes: EquipmentType[] = []
export class InMemoryEquipmentTypeRepository implements EquipmentTypeRepository {

    async getAll(): Promise<EquipmentType[]> {
        return _equipmentTypes.filter(equipmentType => !equipmentType.deletedAt);
    }

    async getById(equipmentTypeId: EquipmentTypeId): Promise<EquipmentType> {
        const equipmentType = _equipmentTypes.find(equipmentType => equipmentType.id.value === equipmentTypeId.value);
        if (!equipmentType) {
            throw new EquipmentTypeRepositoryException(EquipmentTypeRepositoryExceptionMessage.EQUIPMENT_TYPE_NOT_FOUND);
        }
        return equipmentType;
    }

    async getByIds(equipmentTypeIds: EquipmentTypeId[]): Promise<EquipmentType[]> {
        const equipmentTypes = _equipmentTypes.filter(equipmentType => equipmentTypeIds.includes(equipmentType.id));
        if (equipmentTypes.length !== equipmentTypeIds.length) {
            throw new EquipmentTypeException(EquipmentTypeMessageError.EQUIPMENT_TYPE_NOT_FOUND);
        }
        return equipmentTypes;
    }

    async getByName(name: string): Promise<EquipmentType> {
        const equipmentType = _equipmentTypes.find(equipmentType => equipmentType.name === name);
        if (!equipmentType) {
            throw new EquipmentTypeException(EquipmentTypeMessageError.EQUIPMENT_TYPE_NOT_FOUND);
        }
        return equipmentType;
    }

    async create(equipmentType: EquipmentType): Promise<EquipmentType> {
        _equipmentTypes.push(equipmentType);
        return equipmentType;
    }

    async update(equipmentTypeId: EquipmentTypeId, equipmentType: EquipmentType): Promise<void> {
        const index = _equipmentTypes.findIndex(_equipmentType => _equipmentType.id.value === equipmentTypeId.value);
        if (index === -1) {
            throw new EquipmentTypeRepositoryException(EquipmentTypeRepositoryExceptionMessage.EQUIPMENT_TYPE_NOT_FOUND);
        }
        _equipmentTypes[index] = equipmentType;
    }

    async delete(id: EquipmentTypeId): Promise<void> {
        const index = _equipmentTypes.findIndex(equipmentType => equipmentType.id.value === id.value);
        if (index === -1) {
            throw new EquipmentTypeRepositoryException(EquipmentTypeRepositoryExceptionMessage.EQUIPMENT_TYPE_NOT_FOUND);
        }
        _equipmentTypes[index].deletedAt = new Date();
    }
}