import {RequestHandler} from "express";
import {PlaceMessage} from "../../../application/place/exception/place.message";
import {PlaceId} from "../../../domain/place/place-id";
import {PlaceService} from "../../../application/place/place.service";
import {PlaceException} from "../../../application/place/exception/place.exception";
import {Place} from "../../../domain/place/place.model";
import {FieldId} from "../../../domain/place/field/field-id";
import {Address} from "../../../domain/place/address";
import {FieldException} from "../../../application/place/field/exception/field.exception";
import {FieldMessage} from "../../../application/place/field/exception/field.message";
import {Field} from "../../../domain/place/field/field.model";

export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    public fetchAll(): RequestHandler {
        return async (_, res) => {
            try {
                const places = await this.placeService.fetchAll();
                res.status(200).json(places);
            } catch (e) {
                res.status(500).json({ message: PlaceMessage.ERROR_OCCURRED });
            }
        };
    }

    public fetchById(): RequestHandler {
        return async (req, res) => {
            const placeId = req.params.placeId as string;
            if (!placeId) {
                return res.status(400).send({message: PlaceMessage.PLACE_ID_REQUIRED});
            }
            try {
                const place = await this.placeService.fetchById(new PlaceId(placeId));
                res.status(200).json(place);
            } catch (e) {
                if (e instanceof PlaceException) {
                    res.status(404).json({ message: PlaceMessage.PLACE_NOT_FOUND });
                } else {
                    res.status(500).json({ message: PlaceMessage.ERROR_OCCURRED });
                }
            }
        };
    }

    public create(): RequestHandler {
        return async (req, res) => {
            const { fields, address } = req.body;
            try {
                const newPlace = new Place(fields, address);
                const place = await this.placeService.create(newPlace);
                res.status(201).json(place);
            } catch (e) {
                console.error(e);
                res.status(400).json({ message: e instanceof PlaceException ? e.message : PlaceMessage.ERROR_OCCURRED });
            }
        };
    }

    public update(): RequestHandler {
        return async (req, res) => {
            const placeId = req.params.placeId as string;
            const { field, address } = req.body;
            try {
                const updatedPlace = await this.placeService.update(new PlaceId(placeId), field, address);
                res.status(200).json(updatedPlace);
            } catch (e) {
                res.status(500).json({ message: PlaceMessage.ERROR_OCCURRED });
            }
        };
    }

    public delete(): RequestHandler {
        return async (req, res) => {
            const placeId = req.params.placeId;
            try {
                await this.placeService.deleteById(new PlaceId(placeId));
                res.status(204).end();
            } catch (e) {
                res.status(404).json({ message: PlaceMessage.PLACE_NOT_FOUND });
            }
        };
    }

    public addField(): RequestHandler {
        return async (req, res) => {
            const placeId = new PlaceId(req.params.id);
            const { name, fieldType } = req.body;
            if (!name || !fieldType) {
                return res.status(400).json({ message: FieldMessage.ALL_ATTRIBUTES_MUST_BE_FILL });
            }
            try {
                const addedField = await this.placeService.addField(placeId, name, fieldType);
                res.status(200).json(addedField);
            } catch (e) {
                if (e instanceof PlaceException || e instanceof FieldException) {
                    res.status(400).json({ message: e.message });
                } else {
                    res.status(500).json({ message: FieldMessage.ERROR_OCCURRED });
                }
            }
        };
    }

    public removeField(): RequestHandler {
        return async (req, res) => {
            const placeId = new PlaceId(req.params.placeId);
            const fieldId = new FieldId(req.params.fieldId);

            try {
                await this.placeService.removeField(placeId, fieldId);
                res.status(204).end();
            } catch (e) {
                if (e instanceof PlaceException || e instanceof FieldException) {
                    res.status(400).json({ message: e.message });
                } else {
                    res.status(500).json({ message: FieldMessage.ERROR_OCCURRED });
                }
            }
        };
    }
}