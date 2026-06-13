export type LocationCoordinates = {
  latitude: number;
  longitude: number;
};

export type LocationState = {
  address: string;
  coordinates: LocationCoordinates | null;
  isLoading: boolean;
  error: string | null;
};

export const LOCATION_ADDRESS = 'LOCATION_ADDRESS';
export const LOCATION_COORDINATES = 'LOCATION_COORDINATES';
export const LOCATION_LOADING = 'LOCATION_LOADING';
export const LOCATION_ERROR = 'LOCATION_ERROR';

export const LOCATION_ACTIONS = {
  [LOCATION_ADDRESS]: LOCATION_ADDRESS,
  [LOCATION_COORDINATES]: LOCATION_COORDINATES,
  [LOCATION_LOADING]: LOCATION_LOADING,
  [LOCATION_ERROR]: LOCATION_ERROR,
};

export const initialLocationState: LocationState = {
  address: '',
  coordinates: null,
  isLoading: false,
  error: null,
};
