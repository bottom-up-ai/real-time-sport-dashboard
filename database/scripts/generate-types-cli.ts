import { execSync } from 'child_process';
import { envs } from '@/envs';

/**
 * 1. Include only tables from the app schema
 * 2. Exclude knex migrations tables
 */
const command = `pnpm kysely-codegen --include-pattern="${envs.database.schema}.*" --exclude-pattern="${envs.database.schema}.knex_*" --dialect=postgres --out-file ./database.types.d.ts`;

execSync(command, { stdio: 'inherit' });
