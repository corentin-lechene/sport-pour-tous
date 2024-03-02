import * as express from "express";
import {FieldController} from "./field.controller";
import {fieldService} from "../../../../application.configuration";

export class FieldRoute {
    static async getRoutes() {
        const router = express.Router();
        const fieldController = new FieldController(fieldService);

        router.get("/fields", await fieldController.fetchAll());
        router.get("/fields/:fieldId", await fieldController.fetchById());
        router.post("/fields", await fieldController.create());
        router.patch("/fields/:fieldId", await fieldController.update());
        router.delete("/fields/:fieldId", await fieldController.delete());

        return router;
    }
}