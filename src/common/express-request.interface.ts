import { Request } from 'express';
import { UploadFileDto } from 'src/files/dtos/upload-file.dto';
import { JwtPayloadInterface } from 'src/jwt/jwt-payload.interface';

export interface ExpressRequest extends Request {
    user?: JwtPayloadInterface;
    file?: UploadFileDto;
    query;
}
