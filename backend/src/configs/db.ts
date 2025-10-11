import { envs } from '@/configs/envs';
import { logger } from '@/logs';
import { Pool, types } from 'pg';
import { Kysely, PostgresDialect, sql } from 'kysely';

export const db = new Kysely({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: envs.database.url,
			options: `-c search_path=${envs.database.schema}`
		})
	})
});

/* 
	Fix: currently "DATE" column types are returned as
	javascript date object with date + time.
	It fixes that by returning a string "YYYY-MM-DD" instead,
	without any timezone, which matches the behavior from postgresql.
*/
types.setTypeParser(types.builtins.DATE, (val) => val);

/** Test connection. */
(async () => {
    try {
		await sql`SELECT 1`.execute(db);
        logger.info('Database connected');
    } catch (err) {
        logger.error({ msg: 'Database connection failed', err });
    }
})();