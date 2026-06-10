import { Router, Request, Response } from 'express';
import pkg from '../../../package.json';
import registry from './registry.json';

import { accountRouter } from '@routes/account';
import { ERROR_CODES } from '@errors/error-codes';
import { userRouter } from '@routes/user';
export const router = Router();

router.use('/account', accountRouter);
router.use('/user', userRouter);

router.get('/', async (req: Request, res: Response) => {
  try {
    const filteredRoutes = registry.routes.filter((route) => {
      return route.public;
    });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const routes = await Promise.all(
      filteredRoutes.map(async (routeConfig) => {
        const url = `${baseUrl}/api/${routeConfig.id}`;
        const response = await fetch(url);
        const data = await response.json();

        const { meta = {} } = data;

        return {
          meta: {
            ...meta,
            status: response.status,
            statusCode: response,
          },
        };
      }),
    );

    res.status(200).json({
      status: 'ok',
      version: pkg.version,
      timestamp: new Date().toISOString(),
      pageUrl: baseUrl,
      registry,
      routes: routes.map(({ meta }) => {
        const { name, parent, statusCode, status } = meta;
        const url: URL = new URL(req.url || '', `http://${req.headers.host}`);
        return {
          statusCode,
          status,
          meta,
          self: `${baseUrl}/${parent}/${name}${url.search ? `${url.search}` : ''}`,
        };
      }),
    });
  } catch (error) {
    res.status(400).json({
      status: ERROR_CODES.INTERNAL_SERVER_ERROR,
      error: {
        message: error instanceof Error
            ? error.message
            : 'Ruh Roh, Raggy!'
      },
    });
  }
});

export default router;
