import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateAddresses(client: Knex): Promise<number[]> {
  const tableName = 'address';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.text('line 1');
  });

  return populate(client, tableName, 5000, () => ({
    'line 1': faker.location.streetAddress(),
  }));
}
