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

    </APIProvider>
  );
}

export default Map;
