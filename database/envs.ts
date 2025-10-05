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
