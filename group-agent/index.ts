// Group rpc agent
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { createRpcAgent } from "@forestadmin-experimental/rpc-agent";
import { createSqlDataSource } from "@forestadmin/datasource-sql";

import { Schema } from "./typings";

dotenv.config();

(async () => {
  const agent = createRpcAgent<Schema>({
    authSecret: process.env.FOREST_AUTH_SECRET || "",
    isProduction: process.env.NODE_ENV === "production",
    typingsMaxDepth: 5,
    typingsPath: "./typings.ts",
    loggerLevel: "Debug",
  });

  agent
    .addDataSource(createSqlDataSource(process.env.DATABASE_URL as string))
    .customizeCollection("group", (collection) => {
      collection.addAction("Download file", {
        scope: "Global",
        generateFile: true,
        execute: (_, resultBuilder) => {
          const stream = fs.createReadStream(
            path.join(__dirname, "document.pdf"),
          );
          return resultBuilder.file(stream, "document.pdf", "application/pdf");
        },
      });
      collection.addAction("Simple action", {
        scope: "Global",
        form: [
          {
            label: "to",
            type: "Boolean",
          },
        ],
        execute: (_, resultBuilder) => {
          return resultBuilder.success("yoyoyyo");
        },
      });
      collection.addAction("Dyn action", {
        scope: "Global",
        form: [
          {
            label: "to",
            type: "Boolean",
            value: (context) => context.formValues.to,
          },
        ],
        execute: (_, resultBuilder) => {
          return resultBuilder.success("yoyoyyo");
        },
      });
    });

  await agent
    .mountOnStandaloneServer(Number(process.env.APPLICATION_PORT))
    .start();
})();
