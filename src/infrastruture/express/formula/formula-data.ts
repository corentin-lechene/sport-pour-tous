export class FormulaData {
    field: string;
    equipments: string[];
    extras: string[];


    constructor(field: string, equipments: string[], extras: string[]) {
        this.field = field;
        this.equipments = equipments;
        this.extras = extras;
    }
}