import express, { Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';

import { RegisterRoutes } from '../build/routes';

export const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/docs", swaggerUI.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
        swaggerUI.generateHTML(await import("../build/swagger.json"))
    )
})

app.use(bodyParser.json());

RegisterRoutes(app);