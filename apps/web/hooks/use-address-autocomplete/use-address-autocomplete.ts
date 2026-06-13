'use client';

import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';

export interface Address {
  line1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const EMPTY_ADDRESS: Address = {
  line1: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};

export function useAddressAutocomplete() {
  const autocompleteRef =
    useRef<google.maps.places.PlaceAutocompleteElement>(null);
  const places = useMapsLibrary('places');

  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);

  useEffect(() => {
    const autocomplete = autocompleteRef.current;

    if (!autocomplete) {
      return;
    }

    autocomplete.placeholder = places ? 'Address' : 'Loading address search...';
  }, [places]);

  useEffect(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete || !places) {
      return;
    }

    const handleSelect = async (event: Event) => {
      const selectEvent =
        event as google.maps.places.PlacePredictionSelectEvent;
      const place = selectEvent.placePrediction.toPlace();
      await place.fetchFields({ fields: ['addressComponents'] });

      console.log({place});

      const next: Address = {
        line1: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      };

      place.addressComponents?.forEach((component) => {
        if (component.types.includes('street_number')) {
          next.line1 = `${component.longText ?? ''} `;
        }

        if (component.types.includes('route')) {
          next.line1 += component.longText ?? '';
        }

        if (component.types.includes('locality')) {
          next.city = component.longText ?? '';
        }

        if (component.types.includes('administrative_area_level_1')) {
          next.state = component.shortText ?? '';
        }

        if (component.types.includes('postal_code')) {
          next.zip = component.longText ?? '';
        }

        if (component.types.includes('country')) {
          next.country = component.longText ?? '';
        }
      });

      setAddress(next);
    };

    // autocomplete.addEventListener('gmp-select', handleSelect);

    return () => {
      autocomplete.removeEventListener('gmp-select', handleSelect);
    };
  }, [places]);


  return {
    autocompleteRef,
    address,
    formattedAddress: formatAddress(address),
    isReady: Boolean(places),
  };
}


export function formatAddress(address: Address): string {
  if (!address) return '';

  // 1. Group city, state, and zip with correct spacing
  const cityStateZip = [
    address.city?.trim(),
    address.state?.trim()
  ].filter(Boolean).join(', ') + (address.zip ? ` ${address.zip.trim()}` : '');

  // 2. Combine line1, the city/state/zip block, and country
  return [
    address.line1?.trim(),
    cityStateZip.trim(),
    address.country?.trim()
  ]
    .filter(Boolean) // Removes empty elements
    .join(', ');     // Joins remaining parts with commas
}
