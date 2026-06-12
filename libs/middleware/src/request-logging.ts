import { Request, Response, NextFunction } from 'express';

export function requestLogging(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();
  const query = req.query;

  if (query['enableLogging']) {
    res.on('finish', () => {
      const duration = Date.now() - start;

      console.info({
        end: `${duration}ms`,
        requestId: req.headers['x-request-id'],
        status: `${res.statusCode}`,
        method: req.method,
        url: req.url,
      });
    });
  }

  next();
}
