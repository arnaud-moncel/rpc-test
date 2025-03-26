/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';
import createGroup from './groups';

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

(async () => {
  await createGroup(knex);
  console.log('Tables created!');
  await knex.destroy();
})();
