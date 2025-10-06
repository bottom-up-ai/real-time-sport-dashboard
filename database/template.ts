import type { Knex } from 'knex';

const sql = String.raw;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex: Knex) => {
    await knex.raw(sql`
        BEGIN;
			-- your SQL here
        COMMIT;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex: Knex) => {
    await knex.raw(sql`
        BEGIN;
			-- your SQL here
        COMMIT;
    `);
};
