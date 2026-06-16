import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateProjects(
  client: Knex,
  ownerIds: number[],
  groupIds: number[],
): Promise<number[]> {
  const tableName = 'project';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.text('name');
    table.integer('owner_id');
    table.integer('group_id');
  });

  return populate(client, tableName, 5000, () => ({
    name: faker.commerce.productName(),
    owner_id: ownerIds.length ? faker.helpers.arrayElement(ownerIds) : null,
    group_id: groupIds.length ? faker.helpers.arrayElement(groupIds) : null,
  }));
}
