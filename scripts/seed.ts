/* eslint-disable no-console */
import { readFileSync } from "fs";
import { resolve } from "path";

import { parse } from "dotenv";
import Knex from "knex";

import createGroup from "./groups";
import createAddress from "./addresses";
import createUser from "./users";
import createProject from "./projects";

function knexFor(agentDir: string): Knex.Knex {
  const envPath = resolve(__dirname, "..", agentDir, ".env");
  const { DATABASE_URL } = parse(readFileSync(envPath));

  if (!DATABASE_URL) {
    throw new Error(`DATABASE_URL introuvable dans ${envPath}`);
  }

  return Knex({ client: "pg", connection: DATABASE_URL });
}

const groupDb = knexFor("group-agent");
const userDb = knexFor("user-agent");
const projectDb = knexFor("projet-agent");

(async () => {
  try {
    const groupIds = await createGroup(groupDb);
    const addressIds = await createAddress(userDb);
    const userIds = await createUser(userDb, groupIds, addressIds);
    await createProject(projectDb, userIds, groupIds);
    console.log("Tables created!");
  } finally {
    await Promise.all([groupDb.destroy(), userDb.destroy(), projectDb.destroy()]);
  }
})();
