// Main agent
import dotenv from 'dotenv';

import { createAgent } from '@forestadmin/agent';
import { createRpcDataSource, reconciliateRpc } from '@forestadmin-experimental/datasource-rpc';

import { Schema } from './typings';

dotenv.config();

const agent = 
  createAgent<Schema>({
    authSecret: process.env.FOREST_AUTH_SECRET || '',
    envSecret: process.env.FOREST_ENV_SECRET || '',
    isProduction: process.env.NODE_ENV === 'production',
    forestServerUrl: process.env.FOREST_SERVER_URL,
    typingsMaxDepth: 5,
    typingsPath: './typings.ts',
    loggerLevel: 'Debug',
  });

agent
  .addDataSource(createRpcDataSource({uri: 'http://localhost:3351', authSecret: 'abasicauthsecretforuseragent'}))
  .addDataSource(createRpcDataSource({uri: 'http://localhost:3352', authSecret: 'abasicauthsecretforprojectagent'}))
  .addDataSource(createRpcDataSource({uri: 'http://localhost:3353', authSecret: 'abasicauthsecretforgroupagent'}))
  .use(reconciliateRpc);

agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT)).start();
