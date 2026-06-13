'use client';

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useMemo,
  useReducer,
} from 'react';

import {
  initialLocationState,
  type LocationAction,
  locationReducer,
  type LocationState,
} from '../store';

export const LocationStateContext = createContext<LocationState | null>(null);

export const LocationDispatchContext =
  createContext<Dispatch<LocationAction> | null>(null);

export type LocationProviderProps = {
  children: ReactNode;
  initialState?: LocationState;
};

export function LocationProvider({
  children,
  initialState = initialLocationState,
}: LocationProviderProps) {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  const stateValue = useMemo(() => state, [state]);

  return (
    <LocationStateContext.Provider value={stateValue}>
      <LocationDispatchContext.Provider value={dispatch}>
        {children}
      </LocationDispatchContext.Provider>
    </LocationStateContext.Provider>
  );
}
