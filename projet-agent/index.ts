// Project rpc agent
import dotenv from "dotenv";

import { createRpcAgent } from "@forestadmin-experimental/rpc-agent";
import { createSqlDataSource } from "@forestadmin/datasource-sql";
import {
  createRpcDataSource,
  reconciliateRpc,
} from "@forestadmin-experimental/datasource-rpc";

import { Schema } from "./typings";

dotenv.config();

const agent = createRpcAgent<Schema>({
  authSecret: process.env.FOREST_AUTH_SECRET || "",
  isProduction: process.env.NODE_ENV === "production",
  forestServerUrl: process.env.FOREST_SERVER_URL,
  typingsMaxDepth: 5,
  typingsPath: "./typings.ts",
  loggerLevel: "Debug",
});

agent
  .addDataSource(createSqlDataSource(process.env.DATABASE_URL as string))
  .addDataSource(
    createRpcDataSource({
      uri: "http://localhost:3353",
      authSecret: "abasicauthsecretforgroupagent",
    }),
  )
  .addDataSource(
    createRpcDataSource({
      uri: "http://localhost:3351",
      authSecret: "abasicauthsecretforuseragent",
    }),
  )
  .customizeCollection("project", (collection) => {
    collection
      .addManyToOneRelation("group", "group", {
        foreignKey: "group_id",
      })
      .addManyToOneRelation("owner", "user", {
        foreignKey: "owner_id",
      });
  })
  .customizeCollection("group", (collection) => {
    collection.addOneToManyRelation("projects", "project", {
      originKey: "group_id",
    });
  })
  .customizeCollection("user", (collection) => {
    collection.addOneToManyRelation("projects", "project", {
      originKey: "owner_id",
    });
  })
  .use(reconciliateRpc)
  .markCollectionsAsRpc("group");

agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT)).start();
