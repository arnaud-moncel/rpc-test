// Group rpc agent
import dotenv from 'dotenv';

import { createRpcAgent } from '@forestadmin-experimental/rpc-agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

import { Schema } from './typings';

dotenv.config();

const agent = 
  createRpcAgent<Schema>({
    authSecret: process.env.FOREST_AUTH_SECRET || '',
    isProduction: process.env.NODE_ENV === 'production',
    typingsMaxDepth: 5,
    typingsPath: './typings.ts',
    loggerLevel: 'Info',
  });

agent
  .addDataSource(createSqlDataSource(process.env.DATABASE_URL as string));

agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT)).start();
