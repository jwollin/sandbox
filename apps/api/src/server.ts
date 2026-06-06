import {
  // bootstrap,
  router,
} from 'apps/api/src/routes/registry';
import express, { NextFunction, Request, Response } from 'express';
import { logger } from './lib/logger';
import { requestId, requestLogging, errorHandler } from './middleware';
export const app = express();

const PORT = process.env.port || 8080;

export async function start() {
  // Middlewares
  app.use(express.json());
  app.use(requestId);
  // app.use(requestLogging);
  app.use(errorHandler);

  // Routes
  app.use('/api', router);
  // await bootstrap();
  app.listen(PORT, () => {
    logger('INFO', `Server running on http://localhost:${PORT}/api`);
  });
}

export default start;

start().catch(console.error);
