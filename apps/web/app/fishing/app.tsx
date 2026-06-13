'use client';

import React from 'react';
import { AdvancedMarker, APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import { AutofillAddressForm } from '@/components/form/address/address--autofill';
import { TypeMarker } from '@/components/map/map';
import JSON from './LAKES.json';
import style from './page.module.css';
import { Walleye } from '@/components/brand/walleye';

const TEMPORARY_ADDRESS = '17164 Polk St NW, Elk River, MN 55330';

export function App({ API_KEY, data }: { API_KEY: string, data: any }) {
  return (
    <APIProvider apiKey={API_KEY} libraries={['places']}>
      <GoogleMap
        id={`google-map`}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? 'DEMO_MAP_ID'}
        defaultZoom={13}
        className={`${style.map} w-full relative`}
        colorScheme={`DARK`}
        reuseMaps={false}
        defaultCenter={{ lat: 45.3157709, lng: -93.6549327 }}
      >
        {JSON.map((marker: TypeMarker) => (
          <AdvancedMarker
            key={marker.id}
            onClick={() => {
            }}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
          />
        ))}
      </GoogleMap>
      <div className="flex gap-x4 w-full sm:w-10/12 mx-auto mt-5 p-5 border rounded-ld bg-stone-900/80">
        <Walleye height="200" width="300" className="hover-grow-wiggle" />
        <div className="w-full sm:w-3/2">
          <h2 className="font-bold text-lg m-0">Location</h2>
          <p>Address: {TEMPORARY_ADDRESS}</p>
          <p>Longitude: {data.longitude}</p>
          <p>Latitude: {data.latitude}</p>
          <p className="mb-5">Longitude: {data.temperature} {data.unit}</p>
          <AutofillAddressForm API_KEY={API_KEY} />
        </div>
      </div>
    </APIProvider>
  );
}
