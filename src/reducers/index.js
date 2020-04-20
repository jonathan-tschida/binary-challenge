import { combineReducers } from 'redux';
import { cache } from './cache';
import { collection } from './collection';

const rootReducer = combineReducers({ cache, collection });

export default rootReducer;
