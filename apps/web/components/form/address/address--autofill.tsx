'use client';

import { useAddressAutocomplete } from '@buick/hooks';

export function AddressForm_AutoFill() {
  const { inputRef, address } = useAddressAutocomplete();

  return (
    <>
      <input ref={inputRef} placeholder="Start typing address..." />

      <input value={address.line1} readOnly />
      <input value={address.city} readOnly />
      <input value={address.state} readOnly />
      <input value={address.zip} readOnly />
    </>
  );
}
