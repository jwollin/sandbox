import express, { Express } from 'express';
import { logger } from './lib/logger';
import { routeRegistry } from '@buick/routes';
import { requestId, requestLogging, errorHandler } from '@buick/middleware';
export const app: Express = express();

const PORT = process.env.PORT || 8080;

export async function start() {
  app.use(express.json());
  app.use(requestId);
  app.use(requestLogging);

  app.use('/api', routeRegistry);
  app.use(errorHandler);

  app.listen(PORT, () => {
    logger('INFO', `Server running on http://localhost:${PORT}/api`);
  });
}

export default start;

start().catch(console.error);
