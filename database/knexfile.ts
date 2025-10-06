import { envs } from '@/envs';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: 'postgresql',
	connection: envs.database.url,
	pool: {
		min: 0,
		max: 10
	},
	migrations: {
		schemaName: envs.database.schema,
		directory: './migrations'
	},
	searchPath: [envs.database.schema],
};