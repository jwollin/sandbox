'use client';

import React, { useState } from 'react';
import { Address, useAddressAutocomplete } from '@buick/hooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogPortal, DialogContent } from '@/components/ui/dialog';
// import { geocode, RequestType } from 'react-geocode';

export function AutofillAddressForm({ API_KEY }: {API_KEY:string }) {
  const [addressValue, setAddressValue] = React.useState('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { autocompleteRef, address, formattedAddress } = useAddressAutocomplete();
  // console.log({address, formattedAddress })
  //
  // const handleGeocode = React.useCallback(() => {
  //   if (!address) return;
  //
  //   // 2. Call the geocode function
  //   geocode(RequestType.ADDRESS, formattedAddress, { key: API_KEY })
  //     .then((response) => {
  //       // 3. Extract the latitude and longitude from the response
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log({ lat, lng });
  //       setCoordinates({ lat, lng });
  //       setError(null);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError('Could not find coordinates for that address.');
  //       setCoordinates(null);
  //     });
  // }, []);

  return (
    <>
      <Button
        size="sm"
        onClick={() => {
          setOpen(true);
        }}
      >
        Change Address
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogContent>
            {/* Note: Removed 'sr-only' here so the user can actually type into it */}
            <gmp-place-autocomplete
              ref={autocompleteRef}
              includedRegionCodes={['us']}
              id="address"
            />
            <p>
              <strong>Current State Value:</strong> {addressValue}
            </p>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
