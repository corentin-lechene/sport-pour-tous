import {EquipmentType, EquipmentTypeId} from "./equipment-type.model";

export interface EquipmentTypeRepository {
    fetchAll(): Promise<EquipmentType[]>;
    fetchById(equipmentTypeId: EquipmentTypeId): Promise<EquipmentType>;
    create(equipmentType: EquipmentType): Promise<EquipmentType>;
    update(equipmentTypeId: EquipmentTypeId, equipmentType: EquipmentType): Promise<void>;
    delete(id: EquipmentTypeId): Promise<void>;
}