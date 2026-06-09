export const env = {
  PORT: Number(process.env.PORT ?? 8080),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
