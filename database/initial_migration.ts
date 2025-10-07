import knex from 'knex';
import knexFile from '@/knexfile';
import { envs } from '@/envs';

const db = knex(knexFile);

const sql = String.raw;

(async () => {
	if (!envs.isDevelopment) throw Error('Database reset only available in development mode');

    console.time('Initial migration completed');

    await db.raw(sql`
		BEGIN;
			DROP SCHEMA IF EXISTS ${envs.database.schema} CASCADE;

			CREATE SCHEMA IF NOT EXISTS ${envs.database.schema};
		COMMIT;
    `);

    console.timeEnd('Initial migration completed');

    process.exit();
})();
