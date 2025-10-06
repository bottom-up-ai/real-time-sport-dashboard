import path from 'node:path';
import * as dotenv from '@dotenvx/dotenvx';

const dotenvConfig = dotenv.config({ path: path.join(__dirname, '.env') });

if (dotenvConfig.error) throw dotenvConfig.error;

type EnvironmentAvailable = 'development' | 'production';

const parseEnvVariable = (name: string) => {
    const value = process.env[name];

    if (value === undefined || value === '') {
        throw new Error(`Environment variable ${name} is not defined.`);
    }

    return value;
};

const environment = parseEnvVariable('NODE_ENV') as EnvironmentAvailable;

export const envs = {
    environment,
    database: {
        url: parseEnvVariable('DATABASE_URL'),
        schema: parseEnvVariable('DATABASE_SCHEMA'),
    },
};
