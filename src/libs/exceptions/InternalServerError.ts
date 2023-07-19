// can be used like: throw new InternalServerError(msg)
export class InternalServerError extends Error {
    constructor(message = "Internal Server Error") {
        super(message);
        this.name = 'InternalServerError'
    }
}