'use client';

import { useEffect, useRef, useState } from 'react';
import { loadPlaces } from '../../google/load-google';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  // export class google. maps. places. PlaceAutocompleteElement extends HTMLElement implements PlaceAutocompleteElementOptions
  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | undefined;

    (async () => {
      {
        if (!inputRef.current) {
          return;
        }

        await loadPlaces();

        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ['address'],
          componentRestrictions: {
            country: ['us'],
          },
          fields: ['address_components'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete?.getPlace();

          const next: Address = {
            line1: '',
            city: '',
            state: '',
            zip: '',
            country: '',
          };

          place?.address_components?.forEach((component) => {
            if (component.types.includes('street_number')) {
              next.line1 = component.long_name + ' ';
            }

            if (component.types.includes('route')) {
              next.line1 += component.long_name;
            }

            if (component.types.includes('locality')) {
              next.city = component.long_name;
            }

            if (component.types.includes('administrative_area_level_1')) {
              next.state = component.short_name;
            }

            if (component.types.includes('postal_code')) {
              next.zip = component.long_name;
            }

            if (component.types.includes('country')) {
              next.country = component.long_name;
            }
          });

          setAddress(next);
        });
      }
    })();

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, []);

  return {
    inputRef,
    address,
  };
}
