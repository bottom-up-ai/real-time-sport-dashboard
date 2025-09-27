import path from 'node:path';
import * as dotenv from '@dotenvx/dotenvx';
import moduleAlias from 'module-alias';

const dotenvConfig = dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (dotenvConfig.error) throw dotenvConfig.error;

/* 
	Because we use absolute imports with an alias, 
	we need to set a different alias for dev & prod 
*/
if (process.env.NODE_ENV === "production") {
	moduleAlias.addAlias('@', path.join(__dirname, '..', 'dist'));
}

import { envs } from '@/configs';
import { rejectionHandler, exceptionHandler } from '@/errors';
import { logger } from '@/logs';

process.on('uncaughtException', exceptionHandler);
process.on('unhandledRejection', rejectionHandler);

import app from '@/app';

const { host, port } = envs.server;

app.listen({ port, host }, (err, address) => {
    if (err) throw err;

    logger.info(`Server started on http://${host}:${port}`);
});
