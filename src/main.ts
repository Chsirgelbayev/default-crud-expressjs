import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieRarser from 'cookie-parser';
import authRoute from './auth/auth.route';
import filesRoute from './files/files.route';
import { logger } from './utils/logger';
import { ErrorHandlerMiddleware } from './common/middlewares/error-handler.middleware';
import { TypeOrmCreateConnection } from './lib/configuration/typeorm/config';

const app = express();

TypeOrmCreateConnection();

app.use(morgan('dev'))
    .use(express.json())
    .use(cookieRarser())
    .use(cors())
    .use(authRoute)
    .use('/file', filesRoute)
    .use('/static', express.static('./static'))
    .use(ErrorHandlerMiddleware.handle());

app.listen(3000, () => {
    logger.info('Express application successfully started');
});

ErrorHandlerMiddleware.initializeUnhandledException();
