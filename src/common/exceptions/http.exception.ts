export class HttpException extends Error {
    constructor(readonly message, readonly status: number) {
        super(message);
        this.status = status;
    }
}
