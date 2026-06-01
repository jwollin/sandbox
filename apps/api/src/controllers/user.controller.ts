import { Request, Response } from 'express';
import { createUser } from './';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
};
