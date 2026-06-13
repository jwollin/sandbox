'use client';

import { useContext } from 'react';

import { LocationStateContext } from '../context';

export function useLocationState() {
  const context = useContext(LocationStateContext);

  if (context === undefined) {
    throw new Error('useLocationState must be used within a LocationProvider.');
  }

  return context;
}
