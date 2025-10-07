import { envs } from '@/envs';
import type { Knex } from 'knex';

export default {
	client: 'postgresql',
	connection: envs.database.url,
	pool: {
		min: 0,
		max: 10
	},
	migrations: {
		schemaName: envs.database.schema,
		directory: './migrations',
		stub: './template.ts'
	},
	searchPath: [envs.database.schema],
} as Knex.Config;
