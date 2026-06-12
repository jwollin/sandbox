import { Router } from 'express';
import {
  // CreateUserInputRequest,
  createUserSchemaRequest
} from './schema';
import { getDateAndTime } from '@buick/utils';
import { validate } from '@buick/middleware';
import { randomUUID } from 'node:crypto';

export const route = Router();

route.post('/', validate(createUserSchemaRequest), (req, res) => {
  // const { firstname, lastname, username, email } = req?.validated
  //   ?.body as CreateUserInputRequest;
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
        // firstname,
        // lastname,
        // username: username ?? email,
        // email,
      },
      meta: {
        id: randomUUID(),
        created: timestamp,
        updated: timestamp,
      },
    },
  });
});

export default route;
