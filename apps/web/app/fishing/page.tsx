import React from 'react';
import { LocationProvider } from '@/state-management';
import { App } from './app';
import { getNodeApiBaseUrl } from '@/utils/get-api-base-url';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
export type PageProps = {
  searchParams: Promise<{ lat?: string; lng?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  try {
    const resolvedSearchParams = await searchParams;
    const query = new URLSearchParams(resolvedSearchParams).toString();
    const response = await fetch(`${getNodeApiBaseUrl()}/api/fishing${query}`);
    const { data } = await response.json() ?? {};

    return (
      <LocationProvider>
        <main className={`bg-linear-to-tl from-cyan-950 to-stone-900 w-full min-h-screen m-0 h-screen text-gray-400`}>
          <App API_KEY={API_KEY} data={data}/>
        </main>
      </LocationProvider>
    );
  } catch {
    return (
      <div>Uh oh</div>
    )
  }
}
