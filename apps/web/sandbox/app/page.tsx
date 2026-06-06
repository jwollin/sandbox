import React from 'react';
import CodeEditor from '@/component/editor';

export type API = {
  status: string;
  version: string;
  timestamp: string;
  routes: Route[]
}

export type Route = {
  name: string;
  parent: string;
  status: string;
  url: string;
}

export default async function Home() {
  const response: Response = await fetch('http://localhost:8080/api/');
  const data = await response.json() ?? {};
  const routes = data?.routes ?? [];

  return (
    <main className="bg-slate-800 w-full h-screen text-gray-400">
      <div className="sm:container mx-auto p-4 w-full">
        <h1 className="text-4xl font-bold">Routes</h1>
        <p><span className="font-bold">Status:</span> {data.status}</p>
        <p><span className="font-bold">Version:</span> {data.version}</p>
        {routes.length > 0 ? (
          <div className="w-full mt-5 mx-auto border border-gray-500 rounded overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 bg-gray-700 border-b border-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              <div className="px-6 py-3">Name</div>
              <div className="px-6 py-3">Status</div>
            </div>
            {routes.map((route: Route) => {
              return (
                <a href={route.url} key={route.name} target="_blank">
                  <div className="divide-y divide-gray-200 bg-gray-600 text-sm text-gray-300">
                    <div className="grid grid-cols-2 hover:bg-gray-700">
                      <div className="px-6 py-4">
                        {route.name}
                      </div>
                      <div className="px-6 py-4">
                      <span className="px-2 py-1 border border-gray-400 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        {route.status}
                      </span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : null}
        <CodeEditor />
      </div>
    </main>
  );
}
