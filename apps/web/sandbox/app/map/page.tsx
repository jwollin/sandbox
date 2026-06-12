import React from 'react';
import Map from '@/components/map/map';
import JSON from './LAKES.json';
import styles from './map.module.css';

export default async function Page() {
  return (
    <main
      className={`bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400`}
    >
      <Map
        markers={JSON}
        className={`${styles.map}`}
      />
    </main>
  );
}
