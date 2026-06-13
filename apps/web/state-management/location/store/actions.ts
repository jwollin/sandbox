import { LocationCoordinates } from './state';

export type LocationAction =
  | {
      type: 'LOCATION_ADDRESS';
      payload: string;
    }
  | {
      type: 'LOCATION_COORDINATES';
      payload: LocationCoordinates | null;
    }
  | {
      type: 'LOCATION_LOADING';
      payload: boolean;
    }
  | {
      type: 'LOCATION_ERROR';
      payload: string | null;
    }
  | {
      type: 'LOCATION_RESET';
    };
