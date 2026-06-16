import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateGroups(client: Knex): Promise<number[]> {
  const tableName = 'group';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('name');
    table.date('created_at');
  });

  return populate(client, tableName, 5000, () => ({
    name: faker.person.fullName(),
    created_at: faker.date.past(),
  }));
}
