import pino from 'pino';
import { envs } from '@/configs';

const { environment } = envs;

const logsEnv = {
    development: {
        transport: {
            targets: [
                {
                    target: 'pino-pretty',
                    level: 'debug',
                    options: {
                        translateTime: 'SYS:dd/mm/yyyy HH:MM:ss Z', /* 14/04/2023 11:05:50 */
                        ignore: 'pid,hostname',
                    }
                },
            ]
        },
    },
    production: {
        transport: {
            targets: [
                {
                    target: 'pino/file',
                    options: { destination: 1 } /* this writes to STDOUT */
                },
            ]
        }
    }
};

export const logger = pino(logsEnv[environment] as any);
