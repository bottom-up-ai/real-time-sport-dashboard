import path from 'node:path';
import * as dotenv from '@dotenvx/dotenvx';

const dotenvConfig = dotenv.config({ path: path.join(__dirname, '.env') });

if (dotenvConfig.error) throw dotenvConfig.error;

import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl';
import { envs } from './envs';

export default defineConfig({
	dialect: 'pg',
	dialectConfig: {
		connectionString: envs.database.url
	},
	migrations: {
		migrationFolder: './migrations',
		getKnexTimestampPrefix: getKnexTimestampPrefix
	},
});