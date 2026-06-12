import { Router, Request, Response } from 'express';
import pkg from '../../package.json';
import registry from './registry.json';

import { fishingRouter } from '../fishing';
import { accountRouter } from '../account';
import { userRouter } from '../user';

import { ERROR_CODES } from '@buick/errors';

export const routeRegistry = Router();

routeRegistry.use('/account', accountRouter);
routeRegistry.use('/user', userRouter);
routeRegistry.use('/fishing', fishingRouter);

routeRegistry.get('/', async (req: Request, res: Response) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const filteredRoutes = registry.routes.filter((route) => {
      return route.public;
    });
    const routes = await Promise.all(
      filteredRoutes.map(async ({ id }: { id: string }) => {
        const url = `${baseUrl}/api/${id}`;

        try {
          const response = await fetch(url);

          if (!response.ok) {
            return {
              status: response.status,
              statusText: response.statusText,
              meta: {},
              data: {},
              error: `Request failed with ${response.status}`,
            };
          }

          const data = await response.json();
          const { meta = {}, ...rest } = data;
          console.log({ response });
          return {
            status: response.status,
            statusText: response.statusText,
            meta: {
              id,
              name: meta.name ?? 'Unknown',
              ...meta,
            },
            data: rest,
            error: null,
          };
        } catch (error) {
          return {
            status: 0,
            statusText: 0,
            meta: {},
            data: {},
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      }),
    );

    res.status(200).json({
      version: pkg.version,
      timestamp: new Date().toISOString(),
      pageUrl: baseUrl,
      routes: routes.map(({ meta = {}, statusText, status }) => {
        const { name, parent, data } = meta;
        const url: URL = new URL(req.url || '', `http://${req.headers.host}`);
        return {
          status,
          statusText,
          meta: {
            ...meta,
            self: `${baseUrl}/${parent}/${name}${url.search ? `${url.search}` : ''}`,
          },
          data,
        };
      }),
    });
  } catch (error) {
    res.status(400).json({
      status: ERROR_CODES.INTERNAL_SERVER_ERROR,
      error: {
        message: error instanceof Error ? error.message : 'Ruh Roh, Raggy!',
      },
    });
  }
});

export default routeRegistry;
