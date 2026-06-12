import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

let placesPromise: Promise<google.maps.PlacesLibrary> | null = null;

export function loadPlaces() {
  if (!placesPromise) {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      v: 'weekly',
    });

    placesPromise = importLibrary(
      'places',
    ) as Promise<google.maps.PlacesLibrary>;
  }

  return placesPromise;
}
