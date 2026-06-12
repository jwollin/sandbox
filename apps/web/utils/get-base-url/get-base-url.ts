import { headers } from 'next/headers';

/**
 * Universal utility to get the base URL without prop drilling.
 * Works safely in Server Components, Client Components, and API routes.
 */
export async function getBaseUrl(): Promise<string> {
  // 1. Server-side environment check
  if (typeof window === 'undefined') {
    try {
      const headersList = await headers();
      const host = headersList.get('host');

      if (host) {
        const protocol =
          process.env.NODE_ENV === 'development' ? 'http' : 'https';
        return `${protocol}://${host}`;
      }
    } catch {
      console.error('Ruh Roh, Raggy, something went wrong!');
    }

    return 'http://localhost:3000';
  }

  return window.location.origin;
}
