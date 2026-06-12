'use client';

import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
} from '@vis.gl/react-google-maps';

import React from 'react';
import { AddressForm_AutoFill } from '@buick/components/form';

export type TypeMarker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

/*
  ELK RIVER: 45.3157709, -93.6549327
 */
export function Map({
  markers,
  className,
}: {
  markers: TypeMarker[];
  className?: string;
}) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <AddressForm_AutoFill className={`mt-5`} />
      <GoogleMap
        id={`google-map`}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? 'DEMO_MAP_ID'}
        defaultZoom={13}
        colorScheme={`DARK`}
        reuseMaps={false}
        defaultCenter={{ lat: 45.3157709, lng: -93.6549327 }}
        className={className}
      >
        {markers.map((marker: TypeMarker) => (
          <AdvancedMarker
            key={marker.id}
            onClick={() => {}}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
          />
        ))}
      </GoogleMap>
    </APIProvider>
  );
}

export default Map;
