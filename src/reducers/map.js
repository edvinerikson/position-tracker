import * as ActionTypes from '../actions';

export default function map(state = {markers: []}, action) {
  switch (action.type) {
  case ActionTypes.ADD_MARKER:
    return {...state,
      markers: [
        ...state.markers, {
          id: action.payload.id,
          lat: action.payload.lat,
          lng: action.payload.lng,
        },
      ],
    };
  case ActionTypes.REMOVE_MARKER:
    return {
      ...state,
      markers: [
        ...state.markers.filter(marker => !(marker.id === action.payload)),
      ],
    };
  default:
    return state;
  }
}
