import { Router } from 'express';
import { checkJwt } from '../jwt/check-jwt.middleware';
import filesController from './files.controller';
import { uploadFile } from './upload-file.middleware';

const route = Router();

route.post('/upload', checkJwt, uploadFile, filesController.upload);
route.get('/list', checkJwt, filesController.list);
route.get('/:id', checkJwt, filesController.getFile);
route.get('/download/:id', checkJwt, filesController.download);
route.put('/update/:id', checkJwt, uploadFile, filesController.updateFile);
route.delete('/delete/:id', checkJwt, filesController.deleteFile);

export default route;
