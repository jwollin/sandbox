import { bootstrap, router } from '@routes/route-registry';
import express from 'express';
import { logger } from './lib/logger';
import { requestId, requestLogging, errorHandler } from './middleware';
export const app = express();

const PORT = process.env.port || 8080;

async function start() {
  // Middlewares
  app.use(express.json());
  app.use(requestId);
  app.use(requestLogging);
  app.use(errorHandler);

  // Routes
  app.use('/api', router);
  await bootstrap();

  app.listen(PORT, () => {
    logger('INFO', `Server running on http://localhost:${PORT}/api`);
  });
}

start().catch(console.error);
