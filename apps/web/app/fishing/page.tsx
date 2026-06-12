import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <main
      className={`bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400`}
    >
      <h1>HELLO WORLD</h1>
    </main>
  );
}
