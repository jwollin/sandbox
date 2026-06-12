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

const EMPTY_ADDRESS: Address = {
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

    autocomplete.placeholder = places
      ? 'Start typing address...'
      : 'Loading address search...';
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

    autocomplete.addEventListener('gmp-select', handleSelect);

    return () => {
      autocomplete.removeEventListener('gmp-select', handleSelect);
    };
  }, [places]);

  return {
    autocompleteRef,
    address,
    isReady: Boolean(places),
  };
}
