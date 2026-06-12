import React from 'react';

export default async function Home() {
  const response: Response = await fetch('http://localhost:8080/api/fishing');
  const data = (await response.json()) ?? {};
  console.log({ data });
  return (
    <main className="bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400">
      {JSON.stringify(data, null, 4)}
    </main>
  );
}
