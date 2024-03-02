import * as express from "express";
import {UserController} from "./user.controller";
import { userService} from "../../../../application.configuration";
export class UserRoute {
    static async getRoutes() {
        const router = express.Router();
        const userController = new UserController(userService);

        router.get("/users", await userController.getAll());
        router.get("/users/:userId", await userController.getById());
        router.get("/users/email/:userMail", await userController.getByEmail());
        router.post("/users", await userController.create());
        router.delete("/users/:userId", await userController.delete());
        router.patch("/users/:userId", await userController.update());
        router.patch("/users/password/:userId", await userController.updatePassword());
        router.get("/users/invoices/:userId", await userController.getInvoices());

        router.post("/users/:userId/subscribe-session/:sessionId", await userController.subscribeSession());
        router.post("/users/:userId/unsubscribe-session/:sessionId", await userController.unsubscribeSession());

        return router;
    }
}