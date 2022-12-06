import { HttpStatus } from '../http-status.enum';
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
    constructor(objectOrError: string | object = 'Bad Request') {
        super(objectOrError, HttpStatus.BAD_REQUEST);
    }
}
