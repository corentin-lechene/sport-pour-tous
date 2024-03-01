import * as express from "express";
import {UserController} from "./user.controller";
import {UserService} from "../../../../application/client/user/user.service";
import {InMemoryUserRepository} from "../../../in-memory-repository/client/user/in-memory-user.repository";
import {InvoiceService} from "../../../../application/client/invoice/invoice.service";
import {InMemoryInvoiceRepository} from "../../../in-memory-repository/invoice/in-memory-invoice.repository";
export class UserRoute {
    static async getRoutes() {
        const router = express.Router();

        const userController = new UserController (
            new UserService(new InMemoryUserRepository(), new InvoiceService(new InMemoryInvoiceRepository())) // todo: other way
        );

        //todo : get all employees from company

        router.get("/users", await userController.getAll());
        router.get("/users/:userId", await userController.getById());
        router.get("/users/email/:userMail", await userController.getByEmail());
        router.post("/users", await userController.create());
        router.delete("/users/:userId", await userController.delete());
        router.patch("/users/:userId", await userController.update());
        router.patch("/users/password/:userId", await userController.updatePassword());
        router.get("/users/invoices/:userId", await userController.getInvoices());


        // router.post("/users/subscribeSession/:userId", );
        // router.post("/users/unsubscribeSession/:userId", );

        return router;
    }
}