import React from 'react';

export type API = {
  status: string;
  version: string;
  timestamp: string;
  routes: Route[];
};

export type Route = {
  name: string;
  parent: string;
  status: string;
  url: string;
};

export default async function Page() {
  return (
    <main className="bg-slate-800 w-full h-screen text-gray-400">
      <h1>Hello World</h1>
    </main>
  );
}
