import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import videos from './videos';

const rootReducer = combineReducers({user, videos, routing: routerReducer});

export default rootReducer;
