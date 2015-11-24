export const ADD_MARKER = 'ADD_MARKER';
export const REMOVE_MARKER = 'REMOVE_MARKER';
export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION';
export const UPDATE_LOCATION_PERMISSION = 'UPDATE_LOCATION_PERMISSION';

export function addMarker(
  id = Math.random().toString(36).substr(0, 9),
  lat,
  lng) {
  return {
    type: ADD_MARKER,
    payload: {
      id,
      lat,
      lng,
    },
  };
}

export function removeMarker(id) {
  return {
    type: REMOVE_MARKER,
    payload: id,
  };
}

export function updateLocationPermission(state) {
  return {
    type: UPDATE_LOCATION_PERMISSION,
    payload: state,
  };
}

export function updateUserLocation(lat, lng) {
  return {
    type: UPDATE_USER_LOCATION,
    payload: {
      lat,
      lng,
    },
  };
}
