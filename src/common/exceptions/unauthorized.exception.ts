import { HttpStatus } from '../http-status.enum';
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
    constructor(objectOrError: string | object = 'Unauthorized') {
        super(objectOrError, HttpStatus.UNAUTHORIZED);
    }
}
