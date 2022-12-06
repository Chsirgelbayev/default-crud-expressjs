import { NextFunction, Response } from 'express';
import { ExpressRequest } from '../common/express-request.interface';
import { HttpStatus } from '../common/http-status.enum';
import { asyncWrapper } from '../utils/async-wrapper';
import filesService from './files.service';

export default new (class FilesController {
    public upload = asyncWrapper(
        async (req: ExpressRequest, res: Response, next: NextFunction) => {
            const file = await filesService.upload(req.file);
            res.status(HttpStatus.CREATED).json(file);
        }
    );

    public list = asyncWrapper(
        async (req: ExpressRequest, res: Response, next: NextFunction) => {
            const files = await filesService.list(req.query);
            res.status(HttpStatus.CREATED).json(files);
        }
    );

    public getFile = asyncWrapper(
        async (req: ExpressRequest, res: Response, next: NextFunction) => {
            const file = await filesService.get(req.params.id);
            res.status(HttpStatus.OK).json(file);
        }
    );

    public updateFile = asyncWrapper(
        async (req: ExpressRequest, res: Response, next: NextFunction) => {
            const file = await filesService.update(req.file, req.params.id);
            res.status(HttpStatus.CREATED).json(file);
        }
    );

    public deleteFile = asyncWrapper(
        async (req: ExpressRequest, res: Response, next: NextFunction) => {
            const file = await filesService.delete(req.params.id);
            res.status(HttpStatus.NO_CONTENT).json(file);
        }
    );

    public download = asyncWrapper(
        async (req: ExpressRequest, res: Response, next: NextFunction) => {
            const fileName = await filesService.download(req.params.id);

            res.download(`${process.cwd()}/src/static/${fileName}`);
        }
    );
})();
