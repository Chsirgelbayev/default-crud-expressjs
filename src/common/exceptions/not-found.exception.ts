import { HttpStatus } from '../../common/http-status.enum';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
    constructor(objectOrError: string | object = 'Not Found') {
        super(objectOrError, HttpStatus.NOT_FOUND);
    }
}
