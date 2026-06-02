import { Router } from 'express';
import pkg from '../../../package.json';
import fs from 'node:fs/promises';
import path from 'path';
import { logger } from '../../lib/logger';

export const router = Router();

export const bootstrap = async () => {
  const __dirname = path.dirname(__filename);
  const routeDir = path.join(__dirname, '..');
  const routeDirectories = await fs.readdir(routeDir);

  const routes = await Promise.all(
    routeDirectories.map(async (dir) => {
      const directoryFiles = await fs.readdir(`${routeDir}/${dir}`);
      const routerFnFile = directoryFiles.find((file) =>
        file.includes('route'),
      );
      const routerMetaFile = directoryFiles.find((file) =>
        file.includes('meta'),
      );

      if (!routerFnFile || !routerMetaFile) {
        const errorMsg = 'A router configuration was not found';
        logger('ERROR', errorMsg);
        throw new Error();
      }

      const routerDirPath = `${routeDir}/${dir}/`;

      const [route, meta] = await Promise.all([
        import(`${routerDirPath}/${routerFnFile}`),
        import(`${routerDirPath}/${routerMetaFile}`),
      ]);

      return {
        router: route.default,
        meta: meta.default,
        dir,
      };
    }),
  );

  const filteredRoutes = routes.filter((route) => {
    return route.meta.public;
  });

  filteredRoutes.forEach((route) => {
    router.use(`/${route.dir}`, route.router);
  });

  router.get('/', async (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json({
      status: 'ok',
      version: pkg.version,
      timestamp: new Date().toISOString(),
      routes: filteredRoutes.map((route) => {
        return {
          route: route.dir,
          meta: route.meta,
          link: `${baseUrl}/api/${route.dir}`,
        };
      }),
    });
  });
};

export default router;
