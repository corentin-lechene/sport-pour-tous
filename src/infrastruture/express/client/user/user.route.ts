import * as express from "express";
import {UserController} from "./user.controller";
import {UserService} from "../../../../application/client/user/user.service";
import {InMemoryUserRepository} from "../../../in-memory-repository/client/user/in-memory-user.repository";
export class UserRoute {
    static async getRoutes() {
        const router = express.Router();
        const userController = new UserController (
            new UserService(new InMemoryUserRepository())
        );

        //todo : get all employees from company

        router.get("/users", await userController.getAll());
        router.get("/users/:userId", await userController.getById());
        router.get("/users/email/:userMail", await userController.getByEmail());
        router.post("/users", await userController.create());
        // router.post("/users/subscribeSession/:userId", );
        // router.post("/users/unsubscribeSession/:userId", );
        // router.delete("/users/:userId",);

        return router;
    }
}