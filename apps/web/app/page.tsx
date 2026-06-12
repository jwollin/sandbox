import React from 'react';
import { RouteTable, DashboardHeader, Data } from '@buick/components';
import { getNodeApiBaseUrl } from '@/utils/get-api-base-url';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const url = `${getNodeApiBaseUrl()}/api`;
  const response: Response = await fetch(url);
  const data: Data = (await response.json()) ?? {};
  return (
    <main className="bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400">
      <DashboardHeader />
      <div className="sm:container mx-auto p-4 w-full">
        <RouteTable data={data} />
      </div>
    </main>
  );
}
