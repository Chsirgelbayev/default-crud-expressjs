import { Request, Response, NextFunction } from 'express';

export const asyncWrapper =
    (fn: any) =>
    (req: Request, res: Response, next: NextFunction): Promise<any> =>
        Promise.resolve(fn(req, res, next)).catch(next);
