import { CreateUserInput } from '../schemas';

export const createUser = async (data: CreateUserInput) => {
  // pretend DB call
  return {
    id: crypto.randomUUID(),
    ...data,
  };
};
