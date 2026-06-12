'use client';

import { useAddressAutocomplete } from '@buick/hooks';

export function AddressForm_AutoFill({ className }: { className?: string }) {
  const { autocompleteRef, address } = useAddressAutocomplete();

  return (
    <>
      <gmp-place-autocomplete
        ref={autocompleteRef}
        className={`${className}`}
        includedRegionCodes={['us']}
      />

      <input value={address.line1} readOnly />
      <input value={address.city} readOnly />
      <input value={address.state} readOnly />
      <input value={address.zip} readOnly />
    </>
  );
}
