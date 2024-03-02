import {EquipmentType, EquipmentTypeId} from "../../domain/equipment/equipmentType/equipment-type.model";

export interface IActivityService {
    getEquipmentTypesByIds(equipmentTypeIds: EquipmentTypeId[]): Promise<EquipmentType[]>;
}