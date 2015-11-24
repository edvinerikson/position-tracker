import * as ActionTypes from '../actions';

const initialState = {
  location: {
    // lat: 58.432967399999995,
    // lng: 12.291875099999999,
    permission: 'prompt',
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.UPDATE_USER_LOCATION:
    return {...state, location: {...state.location, ...action.payload}};
  case ActionTypes.UPDATE_LOCATION_PERMISSION:
    return {...state, location: {...state.location, permission: action.payload}};
  default:
    return state;
  }
}
