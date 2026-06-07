import { Request, Response, Router } from 'express';
import meta from './meta.json';
import { loginAccountRouter } from '@routes/account/login';

export const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    timestamp: new Date().toISOString(),
    meta,
  });
});

router.use('/login', loginAccountRouter);

export default router;
