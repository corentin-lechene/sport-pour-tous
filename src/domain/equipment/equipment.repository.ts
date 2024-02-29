import {Equipment, EquipmentId} from "./equipment.model";

export interface EquipmentRepository {
    getAll(): Promise<Equipment[]>;
    getById(id: EquipmentId): Promise<Equipment>;
    create(equipment: Equipment): Promise<Equipment>;
    delete(id: EquipmentId): Promise<void>;
}