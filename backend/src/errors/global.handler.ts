import { FastifyRequest, FastifyReply } from 'fastify';

import { envs } from '@/configs';
import { AppError } from '@/errors/App';
import { codes } from '@/errors/codes';

const sendErrorDev = (err: any, req: FastifyRequest, res: FastifyReply) => {
    return res.code(err.HTTPCode).send({
        status: err.status,
        typeCode: err.typeCode,
        message: err.message,
        error: err,
        stack: err.stack
    });
};

const sendErrorProd = (err: any, req: FastifyRequest, res: FastifyReply) => {
    if (err.isOperational) {
        return res.code(err.HTTPCode).send({
            status: err.status,
            typeCode: err.typeCode,
            message: err.message
        });
    }

    /* 4. Notifications if non operational error */
    req.log.fatal('non operational error');

    return res.code(500).send({
        status: 'error',
        typeCode: codes.SERVER_ERROR,
        message: `Quelque chose s'est mal passé!`
    });
};

const handleDuplicateFieldsDB = () => {
    const message = 'La ressource existe déjà.';

    return new AppError(message, 400, codes.BAD_USER_INPUT);
};

const handleInvalidMultipart = () => {
    const message = 'La requête ne contient pas de fichiers.';

    return new AppError(message, 400, codes.BAD_USER_INPUT);
};

const globalErrorHandler = (err: any, req: FastifyRequest, res: FastifyReply) => {
    /* 1. Log original error (+ requestId) */
    req.log.error({ err, params: req.params, body: req.body, query: req.query });

    /* 2. Default values if non operational error */
    err.HTTPCode = err.HTTPCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || `Quelque chose s'est mal passé!`;
    err.typeCode = err.typeCode || codes.SERVER_ERROR;

    /* 3. Handles errors */
    let error = err;
    
    if (envs.isDevelopment) return sendErrorDev(error, req, res);
    
    if (error.code === '23505') error = handleDuplicateFieldsDB();

    if (error.code === 'FST_INVALID_MULTIPART_CONTENT_TYPE') error = handleInvalidMultipart();

    return sendErrorProd(error, req, res);
};

export default globalErrorHandler;
