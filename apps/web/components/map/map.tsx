'use client';

import {
  APIProvider,
  Marker,
  Map as GoogleMap,
} from '@vis.gl/react-google-maps';

import React from 'react';

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
  ...rest
}: {
  markers: TypeMarker[];
  [key: string]: any;
}) {
  return (
    <APIProvider
      apiKey={'AIzaSyDWPuIDjL2wp4rWRMn_j87qXAYzAx6F0ho'}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <GoogleMap
        id={`google-map`}
        defaultZoom={13}
        colorScheme={`DARK`}
        reuseMaps={false}
        defaultCenter={{ lat: 45.3157709, lng: -93.6549327 }}
        {...rest}
      >
        {markers.map((marker: TypeMarker) => (
          <Marker
            key={marker.id}
            onClick={() => {

            }}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </APIProvider>
  );
}

export default Map;
