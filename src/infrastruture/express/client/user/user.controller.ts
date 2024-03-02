import {RequestHandler} from "express";
import {UserService} from "../../../../application/client/user/user.service";
import {Email} from "../../../../common/vo/email/email";
import {EmailException} from "../../../../common/vo/email/email.exception";
import {UserId} from "../../../../domain/client/user/user.model";
import {CreateUserDto} from "./create-user.dto";
import {PhoneNumber} from "../../../../common/vo/phoneNumber/phoneNumber";
import {UserException} from "../../../../application/client/user/user.exception";
import {PhoneNumberException} from "../../../../common/vo/phoneNumber/phoneNumber.exception";
import {UpdateUserDto} from "./update-user.dto";
import {FormulaData} from "../../formula/formula-data";
import {FormulaException} from "../../../../application/formula/formula.exception";
import {SessionException} from "../../../../application/session/session.exception";
import {SessionId} from "../../../../domain/session/session-id";

export class UserController {
    constructor(private readonly userService: UserService) {}

    async getAll(): Promise<RequestHandler> {
        return async (req, res) => {
            const users = await this.userService.getAll();
            const usersFiltered = users.slice().map(user => ({
                ...user, sessions: user.sessions.slice().map(session=> {
                   session.users = []
                    return session
                })
            }))
            res.send(usersFiltered);
        }
    }

    async getById(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;
            if (!userId?.trim()) return res.status(400).end();

            try {
                const user = await this.userService.getById(new UserId(userId.trim()));

                const usersFiltered = {...user,
                    sessions: user.sessions.slice().map(session=> {
                        session.users = []
                        return session
                    })}

                res.send(usersFiltered);
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

                user ? res.send(user) : res.status(404).send();

            } catch (e: any) {
                if(e instanceof EmailException) {
                    res.statusMessage = e.message;
                }
                res.status(404).send();
            }
        }
    }

    async create(): Promise<RequestHandler> {
        return async (req, res) => {
            const firstname = req.body.firstname as string;
            const lastname = req.body.lastname as string;
            const email = req.body.email as string;
            const password = req.body.password as string;
            const address = req.body.address as string;
            const phoneNumber = req.body.phoneNumber as string;

            if (!firstname?.trim() || !lastname?.trim() || !email?.trim() || !password?.trim() || !address?.trim()
                || !phoneNumber?.trim() ) {
                return res.status(400).end();
            }

            try {
                const createUserDto = new CreateUserDto(firstname, lastname, Email.of(email), password, address, PhoneNumber.of(phoneNumber));
                const user = await this.userService.create(createUserDto);
                res.status(201).send(user);
            } catch (e) {
                if(e instanceof UserException || e instanceof EmailException || e instanceof PhoneNumberException) {
                    res.statusMessage = e.message;
                }

                res.status(400).send(e);
            }
        }
    }

    async delete(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;
            if (!userId?.trim()) return res.status(400).end();

            try {
                await this.userService.delete(new UserId(userId.trim()));
                res.status(204).end();
            } catch (e) {
                res.status(404).send();
            }
        }
    }

    async update(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;

            const firstname = req.body.firstname as string;
            const lastname = req.body.lastname as string;
            const email = req.body.email as string;
            const address = req.body.address as string;
            const phoneNumber = req.body.phoneNumber as string;

            if (!userId?.trim() || !firstname?.trim() || !lastname?.trim() || !email?.trim() || !address?.trim() || !phoneNumber?.trim() ) {
                return res.status(400).end();
            }

            try {
                const updateUserDto = new UpdateUserDto(firstname, lastname, Email.of(email), address, PhoneNumber.of(phoneNumber));
                const userUpdated = await this.userService.updateInfo(new UserId(userId.trim()), updateUserDto);

                res.status(200).send(userUpdated);
            } catch (e) {
                if(e instanceof EmailException || e instanceof PhoneNumberException || e instanceof UserException) {
                    res.statusMessage = e.message;
                }

                res.status(404).send();
            }
        }
    }

    async updatePassword(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;
            const password = req.body.password as string;

            if (!userId?.trim() || !password?.trim() ) {
                return res.status(400).end();
            }

            try {
                const userUpdated = await this.userService.updatePassword(new UserId(userId.trim()), password);
                res.status(204).send(userUpdated);
            } catch (e) {
                if(e instanceof UserException) {
                    res.statusMessage = e.message;
                }

                res.status(404).send();
            }
        }
    }

    async getInvoices(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;
            if (!userId?.trim()) return res.status(400).end();

            try {
                const invoices = await this.userService.getAllInvoices(new UserId(userId.trim()));
                res.send(invoices);
            } catch (e) {
                res.status(404).send();
            }
        }
    }

    async subscribeSession(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;
            const sessionId = req.params.sessionId as string;
            if (!userId?.trim() || !sessionId?.trim()) return res.status(400).end();

            // formula
            const formula = req.body.formula as FormulaData;
            if(!formula) return res.status(400).end();

            const field = req.body.formula.field as string;
            const equipmentIds = req.body.formula.equipmentsIds as string[];
            const extras = req.body.formula.extras as string[];

            if(!field?.trim() || !equipmentIds || !extras) return res.status(400).end();

            const formulaData = new FormulaData(field, equipmentIds, extras);

            try {
                await this.userService.subscribeToSession(new UserId(userId.trim()), new SessionId(sessionId.trim()), formulaData);
                res.status(204).send();
            } catch (e) {

                if(e instanceof UserException || e instanceof FormulaException || e instanceof SessionException || e instanceof Error) {
                    res.statusMessage = e.message;
                    res.status(400).send();
                }

                res.status(404).send();
            }
        }
    }

    async unsubscribeSession(): Promise<RequestHandler> {
        return async (req, res) => {
            const userId = req.params.userId as string;
            const sessionId = req.params.sessionId as string;
            if (!userId?.trim() || !sessionId?.trim()) return res.status(400).end();

            try {
                await this.userService.unsubscribeToSession(new UserId(userId.trim()), new SessionId(sessionId.trim()));
                res.status(204).send();

            } catch (e) {
                if(e instanceof UserException) {
                    res.statusMessage = e.message;
                }
                res.status(404).send();
            }
        }
    }
}