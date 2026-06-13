import type { LocationAction } from './actions';
import { type LocationState } from './state';

export function locationReducer(
  state: LocationState,
  action: LocationAction,
): LocationState {
  switch (action.type) {
    case 'LOCATION_ADDRESS': {
      return {
        ...state,
        address: action.payload,
      };
    }

    case 'LOCATION_COORDINATES': {
      return {
        ...state,
        coordinates: action.payload,
      };
    }

    case 'LOCATION_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case 'LOCATION_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
