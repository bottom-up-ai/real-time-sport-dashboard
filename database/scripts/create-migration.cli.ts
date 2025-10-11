import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) throw new Error('Please provide a migration name');

const command = `pnpm knex migrate:make ${name} -x ts --knexfile './../knexfile.ts'`;

execSync(command, { stdio: 'inherit' });
