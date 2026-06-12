import React from 'react';
import { Register } from '@/components/code-editor/editor';
import { RouteTable } from '@/components';
import { Header } from '../components/headers/dashboard';

export type Data = {
  status: string;
  version: string;
  timestamp: string;
  routes: Route[];
  pageUrl: string;
  registry: {
    routes: Register[];
    apps: Register[];
  };
};

export type Route = {
  status: string;
  meta: {
    self: string;
    parent: string;
    name: string;
  };
};

export default async function Home() {
  const response: Response = await fetch('http://localhost:8080/api/');
  const data: Data = (await response.json()) ?? {};
  console.log({ data });
  return (
    <main className="bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400">
      <Header />
      <div className="sm:container mx-auto p-4 w-full">
        <RouteTable data={data} />
      </div>
    </main>
  );
}
