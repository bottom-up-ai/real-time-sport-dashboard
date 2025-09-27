// import knex from 'knex';
// import { envs } from '@/configs/envs';
// import { logger } from '@/logs';
// import { types } from 'pg';

// /* 
// 	Fix: currently "DATE" column types are returned as
// 	javascript date object with date + time.
// 	It fixes that by returning a string "YYYY-MM-DD" instead,
// 	without any timezone, which matches the behavior from postgresql.
// */
// types.setTypeParser(types.builtins.DATE, (val) => val);

// export const db = knex({
//     client: 'pg',
//     connection: envs.database.url,
//     searchPath: [envs.database.schema],
//     pool: { min: 0, max: 10 },
// });

// (async () => {
//     try {
//         await db.raw('SELECT 1');
//         logger.info('Database connected');
//     } catch (err) {
//         logger.error({ msg: 'Database connection failed', err });
//     }
// })();