import React from 'react';
import { DashboardHeader, Map } from '@buick/components';
import JSON from './LAKES.json';
import styles from './map.module.css';

export default async function Page() {
  return (
    <main
      className={`bg-linear-to-tl from-cyan-950 to-stone-900 w-full h-screen text-gray-400`}
    >
      <DashboardHeader />
      <div className="w-full sm:w-1/2 mx-auto">
        <Map markers={JSON} className={`${styles.map}`} />
      </div>
    </main>
  );
}
