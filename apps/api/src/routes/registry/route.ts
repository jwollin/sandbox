import { Router, Request, Response } from 'express';
import pkg from '../../../package.json';
import { accountRouter } from '@routes/account';
import meta from './meta.json';
import { AppError } from '@errors/app-error';
import { ERROR_CODES } from '@errors/error-codes';

export const router = Router();

router.use('/account', accountRouter);

router.get('/', async (req: Request, res: Response) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const routes = await Promise.all(
      meta.routes.map(async (routeConfig) => {
        const url = `${baseUrl}/api/${routeConfig.name}`;
        const response = await fetch(url);
        const data = await response.json();
        return {
          status: response.status,
          statusCode: response,
          ...data,
        };
      }),
    )

    res.status(200).json({
      status: 'ok',
      version: pkg.version,
      timestamp: new Date().toISOString(),
      routes: routes.map(({ status, meta, statusCode }) => {
        const { name, parent } = meta;
        const url: URL = new URL(req.url || '', `http://${req.headers.host}`);
        return {
          statusCode,
          status,
          name: meta.name,
          parent: `/${meta.parent}`,
          url: `${baseUrl}/${parent}/${name}${url.search ? `${url.search}` : ''}`
        };
      }),
    });
  } catch (error) {
    res.status(400).json({
      status: ERROR_CODES.INTERNAL_SERVER_ERROR,
      error: {
        // @ts-ignore
        message: error?.message ?? 'Ruh Roh, Raggy!'
      },
    });
  }
});

export default router;
