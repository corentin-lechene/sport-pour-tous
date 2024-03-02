import * as express from "express";
import {PlaceController} from "./place.controller";
import {PlaceService} from "../../../application/place/place.service";
import {InMemoryPlaceRepository} from "../../in-memory-repository/in-memory-place.repository";
import {FieldService} from "../../../application/place/field/field.service";
import {InMemoryFieldRepository} from "../../in-memory-repository/in-memory-field.repository";

export class PlaceRoute {
    static async getRoutes () {
        const router = express.Router();
        const placeRepository = new InMemoryPlaceRepository();
        const fieldRepository = new InMemoryFieldRepository();
        const fieldService = new FieldService(fieldRepository);
        const placeService = new PlaceService(placeRepository, fieldService);
        const placeController = new PlaceController(placeService);
        
        router.get("/places", await placeController.fetchAll());
        router.get("/places/:placeId", await placeController.fetchById());
        router.post("/places", await placeController.create());
        router.patch("/places/:placeId", await placeController.update());
        router.delete("/places/:placeId", await placeController.delete());
        router.post("/places/:id/fields", placeController.addField());
        router.delete("/places/:placeId/fields/:fieldId", placeController.removeField());
        // router.get("/places/fields/address", placeController.fetchFieldsByAddress());

        return router;
    }
}