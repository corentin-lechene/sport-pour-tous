import * as express from "express";
import * as dotenv from "dotenv";
import * as dayjs from "dayjs";
import {ConsoleLogger, LoggerService} from "../../common";
import {EquipmentTypeRoute} from "./equipments/equipmentType/equipment-type.route";

dotenv.config();

const PORT = process.env.PORT || 3000;

export async function start_express() {
    const app = express();

    app.use(express.json());

    // logs
    app.use(loggerMiddleware());

    // test
    app.get("/ping", (_, res) => res.send("pong"));

    // all routes
    app.use(await EquipmentTypeRoute.getRoutes());


    // populate for dev

    // undefined routes
    app.use((_, res) => {
        res.locals.routeNotExists = true;
        res.status(404).end();
    });

    app.listen(PORT, async () => {
        console.log(`Server started on http://localhost:${PORT}/`);
    });
}

export function loggerMiddleware(): express.RequestHandler {
    return (req, res, next) => {
        const logger = new LoggerService(new ConsoleLogger());

        const time = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS");
        const method = req.method;
        const route = req.originalUrl;

        logger.log(`${time} - [${method}]~${route} => requested`);

        res.on('finish', () => onFinishMiddleware(req, res));

        next();
    }
}

function onFinishMiddleware(req: express.Request, res: express.Response) {
    const logger = new LoggerService(new ConsoleLogger());
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS");
    const method = req.method;
    const route = req.originalUrl;

    const logMessage = `${time} - [${method}]~${route} => ${res.statusCode}`;
    if (res.locals.routeNotExists as boolean) {
        logger.error(logMessage);
    } else {
        logger.success(logMessage);
    }
}