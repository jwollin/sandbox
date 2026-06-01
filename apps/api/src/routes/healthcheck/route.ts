import { Router } from 'express';
import meta from './meta.json';

export const healthcheckRoute = Router();

healthcheckRoute.get('/', (req, res) => {
  return res.json({
    status: 'ok',
    name: 'healthcheck',
    timestamp: new Date().toISOString(),
    meta,
  });
});

export default healthcheckRoute;
