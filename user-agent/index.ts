// User rpc agent
import dotenv from "dotenv";

import { createRpcAgent } from "@forestadmin-experimental/rpc-agent";
import { createSqlDataSource } from "@forestadmin/datasource-sql";
import { createRpcDataSource } from "@forestadmin-experimental/datasource-rpc";

import { Schema } from "./typings";

dotenv.config();

const agent = createRpcAgent<Schema>({
  authSecret: process.env.FOREST_AUTH_SECRET || "",
  isProduction: process.env.NODE_ENV === "production",
  typingsMaxDepth: 5,
  typingsPath: "./typings.ts",
  loggerLevel: "Debug",
});

agent
  .addDataSource(
    createSqlDataSource(process.env.DATABASE_URL as string, {
      liveQueryConnections: "main-user-rpc",
    }),
  )
  .addDataSource(
    createRpcDataSource({
      uri: "http://localhost:3353",
      authSecret: "abasicauthsecretforgroupagent",
    }),
    { markCollectionsAsRpc: true },
  )
  .addChart("RPC user chart", (_, resultBuilder) => {
    return resultBuilder.objective(2, 5);
  })
  .customizeCollection("user", (collection) => {
    collection
      .addManyToOneRelation("group", "group", {
        foreignKey: "group_id",
      })
      .addField("SFDepedingOnRPC", {
        columnType: "String",
        dependencies: ["id", "group:id"],
        getValues: (records) => records.map((r) => `${r.id} => ${r.group.id}`),
      });
  })
  .customizeCollection("group", (collection) => {
    collection.addOneToManyRelation("users", "user", {
      originKey: "group_id",
    });
  });

agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT)).start();
