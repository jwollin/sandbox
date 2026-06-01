import { z, string, email, object, ZodError } from 'zod';

export const createUserSchema = object({
  firstname: string().min(2).max(20),
  lastname: string().min(2).max(20),
  username: string().max(25).optional(),
  email: email().max(25),
  password: string().max(100),
});

export const createUserSchemaRequest = object({
  body: createUserSchema,
});

export const createUserSchemaResponse = object({
  validated: createUserSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateUserInputRequest = z.infer<
  typeof createUserSchemaRequest
>['body'];

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
};

export type DateAndTimes = {
  time: string;
  date: string;
  timestamp: string;
};

export type UserMetaData = User & {
  id: string;
  created: DateAndTimes;
  updated: DateAndTimes;
};

export type UserErrorIssue = {
  field: string;
  message: string;
  code: string;
};

export type UserError = {
  type: string;
  issues: UserErrorIssue[];
};

export type CreateUserResponse = {
  status: 'ok' | 'error' | 'warning';
  data?: {
    user: User;
    metadata: UserMetaData;
  };
  error?: UserError;
};
