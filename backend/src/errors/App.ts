export class AppError extends Error {
    message: string;
    HTTPCode: number;
    status: string;
    isOperational: boolean;
    typeCode: string;

    constructor(message: string, HTTPCode: number, typeCode: string) {
        super();
        
        this.message = message;

        this.HTTPCode = HTTPCode;

        this.typeCode = typeCode;

        this.status = `${HTTPCode}`.startsWith('4') ? 'fail' : 'error';

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
