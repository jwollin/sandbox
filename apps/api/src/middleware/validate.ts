import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

type AnyZodObject = z.ZodObject<any>;

export const validate = <T extends AnyZodObject>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.validated = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      return next(err);
    }
  };
};
