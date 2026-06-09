import fs from 'node:fs/promises';
import path from 'path';
import { logger } from '../../lib/logger';
import { getRouterFiles } from './index';
import { writeFileSync } from 'node:fs';
const env = process.env.NODE_ENV;
const isDev = env === 'development';

export const bootstrap = async () => {
  const __dirname = path.dirname(__filename);
  const routeDir = path.join(__dirname, '..');
  const routeDirectories = await fs.readdir(routeDir);

  if (isDev) {
    const routes = await Promise.all(
      routeDirectories.map(async (dir, index) => {
        const directoryFiles = await fs.readdir(`${routeDir}/${dir}`);
        const files = getRouterFiles(directoryFiles);
        const { route: routerFnFile, meta: routerMetaFile } = files;

        if (!routerFnFile || !routerMetaFile) {
          const errorMsg = 'Router configurations were not found';
          logger('ERROR', errorMsg);
          return {};
        }

        const routerDirPath = `${routeDir}/${dir}/`;
        const routerFnPath = `${routerDirPath}/${routerFnFile}`;
        const routerMetaPath = `${routerDirPath}/${routerMetaFile}`;

        const [route, meta] = await Promise.all([
          import(routerFnPath),
          import(routerMetaPath),
        ]);
        return {
          router: route.default,
          meta: meta.default,
          dir,
        };
      }),
    );

    const filteredRoutes = routes.filter((route) => {
      return route?.meta?.public;
    });
    const root = path.resolve(__dirname, '../../..');
    writeFileSync(
      `${root}/dist/routes.json`,
      JSON.stringify({ ...filteredRoutes }, null, 2),
      'utf-8',
    );
  }
};
