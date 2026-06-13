import { headers } from 'next/headers';

const DEFAULT_WEB_URL = 'http://localhost:3000';

function firstHeaderValue(value: string | null): string | undefined {
  return value?.split(',')[0]?.trim() || undefined;
}

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host =
    firstHeaderValue(headersList.get('x-forwarded-host')) ??
    firstHeaderValue(headersList.get('host'));

  if (!host) {
    return process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_WEB_URL;
  }

  const protocol =
    firstHeaderValue(headersList.get('x-forwarded-proto')) ??
    (host.startsWith('localhost') || host.startsWith('127.0.0.1')
      ? 'http'
      : 'https');

  return `${protocol}://${host}`;
}
