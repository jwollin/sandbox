// TODO: UPDATE
export const createUser = async (data: any) => {
  // pretend DB call
  return {
    id: crypto.randomUUID(),
    ...data,
  };
};
