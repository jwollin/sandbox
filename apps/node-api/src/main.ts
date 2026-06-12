import express, { Express } from 'express';
import { logger } from './lib/logger';
import { routeRegistry } from '@buick/routes';
import { requestId, requestLogging, errorHandler } from '@buick/middleware';
export const app: Express = express();

const PORT = process.env.port || 8080;

export async function start() {
  // Middlewares
  app.use(express.json());
  app.use(requestId);
  app.use(requestLogging);
  app.use(errorHandler);

  // Routes
  app.use('/api', routeRegistry);

  app.listen(PORT, () => {
    logger('INFO', `Server running on http://localhost:${PORT}/api`);
  });
}

export default start;

start().catch(console.error);
