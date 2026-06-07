export const PORTS = {
  web: 3000,
  api: 8080,
  admin: 5000,
} as const;

export type AppName = keyof typeof PORTS;

export const getPort = (type: AppName): number => PORTS[type];
