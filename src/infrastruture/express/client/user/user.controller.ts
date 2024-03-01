import {RequestHandler} from "express";
import {UserService} from "../../../../application/client/user/user.service";
import {Email} from "../../../../common/vo/email/email";
import {EmailException} from "../../../../common/vo/email/email.exception";
import {UserId} from "../../../../domain/client/user/user.model";

export class UserController {
    constructor(private readonly userService: UserService) {
        this.userService = userService;
    }
    async getAll(): Promise<RequestHandler> {
        return async (req, res) => {
            const users = await this.userService.getAll();
            res.send(users);
        }
    }

    async getById(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;
            if (!userId?.trim()) return res.status(400).end();

            try {
                const user = await this.userService.getById(new UserId(userId.trim()));
                res.send(user);
            } catch (e) {
                res.status(404).send();
            }
        }
    }

    async getByEmail(): Promise<RequestHandler> {
        return async (req, res) => {
            const userMail = req.params.userMail as string;
            if (!userMail?.trim())  {
                return res.status(400).end();
            }
            try {
                const email = Email.of(userMail);
                const user = await this.userService.getByEmail(email);
                res.send(user);
            } catch (e: any) {
                if(e instanceof EmailException) {
                    res.statusMessage = e.message;
                }
                res.status(404).send();
            }
        }
    }
}