import { AppError } from '@/errors/App';
import { logger } from '@/logs';

const exceptionHandler = (error: AppError) => {
    logger.fatal({ err: error }, 'uncaught exception, shutting down...');

    process.exitCode = 1;
};

export default exceptionHandler;
