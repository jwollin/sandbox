import React from 'react';
import {
  RouteTable,
  DashboardHeader,
  // AddressForm_AutoFill,
  Data,
} from '@buick/components';

export default async function Page() {
  const response: Response = await fetch('http://localhost:8080/api/');
  const data: Data = (await response.json()) ?? {};
  console.log({ data });
  return (
    <main className="bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400">
      {/*<DashboardHeader />*/}
      <h1>HELLO WORLD</h1>
      <div className="sm:container mx-auto p-4 w-full">
        {/*<RouteTable data={data} />*/}
        {/*<AddressForm_AutoFill />*/}
      </div>
    </main>
  );
}
