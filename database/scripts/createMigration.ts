import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) throw new Error('Please provide a migration name');

execSync(`pnpx knex migrate:make ${name} -x ts --knexfile './../knexfile.ts' --stub ./template.ts`, {
  	stdio: 'inherit'
});
