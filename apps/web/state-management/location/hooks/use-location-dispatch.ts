'use client';

import { useContext } from 'react';

import { LocationDispatchContext } from '../context';

export function useLocationDispatch() {
  const context = useContext(LocationDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useLocationDispatch must be used within a LocationProvider.',
    );
  }

  return context;
}
