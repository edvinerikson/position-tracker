export const EARTH_MEAN_RADIUS = 6378137;

function rad(x) {
  return x * Math.PI / 180;
}

export function getDistance(latLng1, latLng2) {
  const dLat = rad(latLng2.lat - latLng1.lat);
  const dLng = rad(latLng2.lng - latLng1.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(latLng1.lat)) * Math.cos(rad(latLng2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.floor(EARTH_MEAN_RADIUS * c);
}
