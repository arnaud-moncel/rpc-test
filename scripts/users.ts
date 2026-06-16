import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateUsers(
  client: Knex,
  groupIds: number[],
  addressIds: number[],
): Promise<number[]> {
  const tableName = 'user';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.text('name');
    table.integer('group_id');
    table.integer('adress_id').references('id').inTable('address');
  });

  return populate(client, tableName, 5000, () => ({
    name: faker.person.fullName(),
    group_id: groupIds.length ? faker.helpers.arrayElement(groupIds) : null,
    adress_id: addressIds.length ? faker.helpers.arrayElement(addressIds) : null,
  }));
}
