import * as express from "express";
import {PlaceController} from "./place.controller";
import {placeService} from "../../../application.configuration";

export class PlaceRoute {
    static async getRoutes () {
        const router = express.Router();
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