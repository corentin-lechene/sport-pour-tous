import {EquipmentType, EquipmentTypeId} from "./equipment-type.model";

export interface EquipmentTypeRepository {
    getAll(): Promise<EquipmentType[]>;
    getById(equipmentTypeId: EquipmentTypeId): Promise<EquipmentType>;
    getByIds(equipmentTypeIds: EquipmentTypeId[]): Promise<EquipmentType[]>;
    getByName(name: string): Promise<EquipmentType>;
    create(equipmentType: EquipmentType): Promise<EquipmentType>;
    update(equipmentTypeId: EquipmentTypeId, equipmentType: EquipmentType): Promise<void>;
    delete(id: EquipmentTypeId): Promise<void>;
}