// import { overpass } from 'overpass-ts';
//
// // Initialize the client
// const overpass = new Overpass({
//   endpoint: 'https://overpass-api.de',
//   fetch
// });
//
// // Define types for the expected GeoJSON response
// interface OSMGeoJSON {
//   type: "FeatureCollection";
//   features: Array<{
//     type: "Feature";
//     properties: {
//       id: number;
//       name?: string;
//       water?: string;
//     };
//     geometry: any; // GeoJSON geometry type
//   }>;
// }
//
// async function fetchLakes(): Promise<OSMGeoJSON> {
//   // Overpass QL query to find "natural=water" with "water=lake" in the specified Bounding Box
//   // Format: [bbox:minLat,minLon,maxLat,maxLon]
//   const query = `
//     [out:json][timeout:25];
//     (
//       way["natural"="water"]["water"="lake"](44.2,-93.8,44.5,-93.3);
//       relation["natural"="water"]["water"="lake"](44.2,-93.8,44.5,-93.3);
//     );
//     out body;
//     >;
//     out skel qt;
//   `;
//
//   try {
//     const response = await overpass.query(query, { flatProperties: true, format: 'geojson' });
//     return response as unknown as OSMGeoJSON;
//   } catch (error) {
//     console.error('Error fetching lakes:', error);
//     throw error;
//   }
// }
