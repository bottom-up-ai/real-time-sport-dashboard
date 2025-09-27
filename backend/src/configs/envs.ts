type EnvironmentAvailable = 'development' | 'production';

const parseEnvVariable = (name: string) => {
    const value = process.env[name];

    if (value === undefined || value === '') {
        throw new Error(`Environment variable ${name} is not defined.`);
    }

    return value;
};

const environment = parseEnvVariable('NODE_ENV') as EnvironmentAvailable;
const isProduction = environment === 'production';
const isDevelopment = environment === 'development';

export const envs = {
    environment,
    isProduction,
    isDevelopment,
    server: {
        port: parseInt(parseEnvVariable('PORT'), 10),
		host: parseEnvVariable('HOST'),
    },
    database: {
        url: parseEnvVariable('DATABASE_URL'),
        schema: parseEnvVariable('DATABASE_SCHEMA'),
    },
};
