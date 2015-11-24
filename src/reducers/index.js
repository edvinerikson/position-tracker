// import * as ActionTypes from '../actions';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import map from './map';
import user from './user';

const rootReducer = combineReducers({
  router,
  map,
  user,
});

export default rootReducer;
