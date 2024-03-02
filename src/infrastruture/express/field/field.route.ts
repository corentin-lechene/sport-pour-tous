import * as express from "express";
import {FieldController} from "./field.controller";
import {FieldService} from "../../../application/place/field/field.service";
import {InMemoryFieldRepository} from "../../in-memory-repository/in-memory-field.repository";

export class FieldRoute {
    static async getRoutes() {
        const router = express.Router();
        const fieldController = new FieldController(new FieldService(new InMemoryFieldRepository()));

        router.get("/fields", await fieldController.fetchAll());
        router.get("/fields/:fieldId", await fieldController.fetchById());
        router.post("/fields", await fieldController.create());
        router.patch("/fields/:fieldId", await fieldController.update());
        router.delete("/fields/:fieldId", await fieldController.delete());

        return router;
    }
}