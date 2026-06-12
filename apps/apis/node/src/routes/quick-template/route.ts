import { Request, Response, Router } from 'express';
import meta from './meta.json';

export const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    timestamp: new Date().toISOString(),
    meta,
  });
});

export default router;
