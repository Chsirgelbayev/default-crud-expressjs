import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { HttpException } from '../exceptions/http.exception';

export class ErrorHandlerMiddleware {
    public static handle() {
        return async (
            err: HttpException,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            const status = err.status || 500;
            const message = err.message || 'Internal Server Error';

            res.status(status).json({
                success: false,
                message
            });
        };
    }

    public static initializeUnhandledException() {
        process.on(
            'unhandledRejection',
            (reason: Error, promise: Promise<any>) => {
                logger.error(reason);
                logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
                throw reason;
            }
        );

        process.on('uncaughtException', (err: Error) => {
            logger.error(err);
            logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
            process.exit(1);
        });
    }
}
