import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import competitionRouter from './controller/competition.routes';
import teamRouter from './controller/team.routes';
import userRouter from './controller/user.routes';
import matchRouter from './controller/match.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

dotenv.config();
const app = express();
app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ["'self'", 'https://api.ucll.be'],
        },
    })
);

const port = process.env.APP_PORT || 3000;

app.use(
    cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({ path: ['/api-docs', /^\/api-docs\/.*/, '/user/login', '/user/signup', '/status'] })
);

app.use('/match', matchRouter);
app.use('/user', userRouter);
app.use('/teams', teamRouter);
app.use('/competitions', competitionRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(400).json({
        status: 'application error',
        message: err.message,
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
