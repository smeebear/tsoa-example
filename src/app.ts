import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { ValidateError } from 'tsoa';

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

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields
        })
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
    next();
})