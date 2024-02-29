import {EquipmentType, EquipmentTypeId} from "../../domain/equipment/equipmentType/equipment-type.model";
import {EquipmentTypeRepository} from "../../domain/equipment/equipmentType/equipment-type.repository";
import {EquipmentTypeException} from "../../application/equipment/equipmentType/exception/equipment-type.exception";
import {
    EquipmentTypeMessageError
} from "../../application/equipment/equipmentType/exception/equipment-type.message-error";


export class InMemoryEquipmentTypeRepository implements EquipmentTypeRepository {
    private _equipmentTypes: EquipmentType[] = [];

    async getAll(): Promise<EquipmentType[]> {
        return this._equipmentTypes.filter(equipmentType => !equipmentType.deletedAt);
    }

    async getById(equipmentTypeId: EquipmentTypeId): Promise<EquipmentType> {
        const equipmentType = this._equipmentTypes.find(equipmentType => equipmentType.id.value === equipmentTypeId.value);
        if (!equipmentType) {
            throw new EquipmentTypeException(EquipmentTypeMessageError.EQUIPMENT_TYPE_NOT_FOUND);
        }
        return equipmentType;
    }

    async getByName(name: string): Promise<EquipmentType> {
        const equipmentType = this._equipmentTypes.find(equipmentType => equipmentType.name === name);
        if (!equipmentType) {
            throw new EquipmentTypeException(EquipmentTypeMessageError.EQUIPMENT_TYPE_NOT_FOUND);
        }
        return equipmentType;
    }

    async create(equipmentType: EquipmentType): Promise<EquipmentType> {
        this._equipmentTypes.push(equipmentType);
        return equipmentType;
    }

    async update(equipmentTypeId: EquipmentTypeId, equipmentType: EquipmentType): Promise<void> {
        const index = this._equipmentTypes.findIndex(_equipmentType => _equipmentType.id.value === equipmentTypeId.value);
        if (index === -1) {
            throw new EquipmentTypeException(EquipmentTypeMessageError.EQUIPMENT_TYPE_NOT_FOUND);
        }
        this._equipmentTypes[index] = equipmentType;
    }

    async delete(id: EquipmentTypeId): Promise<void> {
        const index = this._equipmentTypes.findIndex(equipmentType => equipmentType.id.value === id.value);
        if (index === -1) {
            throw new EquipmentTypeException(EquipmentTypeMessageError.EQUIPMENT_TYPE_NOT_FOUND);
        }
        this._equipmentTypes[index].deletedAt = new Date();
    }
}