import { Kysely, sql } from 'kysely';

exports.up = async (db: Kysely<any>): Promise<void> => {
	await db.transaction().execute(async (trx) => {
		await sql`
			-- Your sql here
		`.execute(trx);
	});
};

exports.down = async (db: Kysely<any>): Promise<void> => {
    await db.transaction().execute(async (trx) => {
		await sql`
			-- Your sql here
		`.execute(trx);
	});
};
