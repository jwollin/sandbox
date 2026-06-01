import { Router } from 'express';
import {
  CreateUserInputRequest,
  createUserSchema,
  createUserSchemaRequest,
} from './schema';
import { validate } from '../../middleware';
import { randomUUID } from 'node:crypto';

export const userRoute = Router();

export function getDateAndTime() {
  const now = new Date();

  const time = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  const date = now
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');

  return {
    now,
    time,
    date,
  };
}

userRoute.post('/', validate(createUserSchemaRequest), (req, res) => {
  const { firstname, lastname, username, email } = req?.validated
    ?.body as CreateUserInputRequest;
  const { time, date, now } = getDateAndTime();
  const timestamp = {
    time,
    date,
    timestamp: now,
  };

  return res.json({
    status: 'ok',
    data: {
      user: {
        firstname,
        lastname,
        username: username ?? email,
        email,
      },
      meta: {
        id: randomUUID(),
        created: timestamp,
        updated: timestamp,
      },
    },
  });
});

export default userRoute;
