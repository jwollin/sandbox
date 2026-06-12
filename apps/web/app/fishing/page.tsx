import React from 'react';
import { getNodeApiBaseUrl } from '../../utils/get-api-base-url';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const response: Response = await fetch(`${getNodeApiBaseUrl()}/api/fishing`);
  const data = (await response.json()) ?? {};

  return (
    <main className="bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400">
      {JSON.stringify(data, null, 4)}
    </main>
  );
}
