import {FieldService} from "../../../../application/place/field/field.service";
import {RequestHandler} from "express";
import {FieldId} from "../../../../domain/place/field/field-id";
import {FieldType} from "../../../../domain/place/field/field-type.enum";
import {FieldException} from "../../../../application/place/field/exception/field.exception";
import {FieldMessage} from "../../../../application/place/field/exception/field.message";

export class FieldController {
    constructor(private readonly fieldService: FieldService) {
        this.fieldService = fieldService;
    }

    async fetchAll(): Promise<RequestHandler> {
        return async (_, res) => {
            const fields = await this.fieldService.fetchAll();
            res.send(fields);
        }
    }

    async fetchById(): Promise<RequestHandler> {
        return async (req, res) => {
            const fieldId = req.params.fieldId as string;
            if (!fieldId) {
                return res.status(400).send({message: FieldMessage.FIELD_ID_REQUIRED});
            }
            try {
                const field = await this.fieldService.fetchById(new FieldId(fieldId));
                res.send(field);
            } catch (e) {
                console.error(e);
                res.status(404).end();
            }
        }
    }

    async create(): Promise<RequestHandler> {
        return async (req, res) => {
            const {name, fieldType} = req.body as { name: string, fieldType: FieldType };
            if (!name?.trim() || !fieldType) {
                return res.status(400).send({message: FieldMessage.ALL_ATTRIBUTES_MUST_BE_FILL});
            }
            try {
                const field = await this.fieldService.create(name, fieldType);
                res.status(201).send(field);
            } catch (e) {
                console.error(e);
                res.status(400).end();
            }
        }
    }

    async update(): Promise<RequestHandler> {
        return async (req, res) => {
            const fieldId = req.params.fieldId as string;
            const {name, type} = req.body as { name: string; type: FieldType };

            if (!fieldId) {
                return res.status(400).send({message: FieldMessage.FIELD_ID_REQUIRED});
            }

            if (!name?.trim() || !type) {
                return res.status(400).send({message: FieldMessage.ALL_ATTRIBUTES_MUST_BE_FILL});
            }

            try {
                const updatedField = await this.fieldService.update(new FieldId(fieldId), name.trim(), type);
                res.status(200).send(updatedField);
            } catch (e) {
                console.error(e);
                if (e instanceof FieldException) {
                    res.status(404).send({message: FieldMessage.FIELD_NOT_FOUND});
                } else {
                    res.status(500).send({message: FieldMessage.ERROR_OCCURRED});
                }
            }
        }
    }

    async delete(): Promise<RequestHandler> {
        return async (req, res) => {
            const fieldId = req.params.fieldId as string;
            if (!fieldId) {
                return res.status(400).send({message: FieldMessage.FIELD_ID_REQUIRED});
            }
            try {
                await this.fieldService.deleteById(new FieldId(fieldId));
                res.status(204).end();
            } catch (e) {
                console.error(e);
                if (e instanceof FieldException) {
                    res.status(404).send({message: FieldMessage.FIELD_NOT_FOUND});
                } else {
                    res.status(500).send({message: FieldMessage.ERROR_OCCURRED});
                }
            }
        }
    }
}