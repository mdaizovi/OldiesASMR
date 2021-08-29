import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import audioReducer from '../reducers/audioReducer';
import songPlayReducer from '../reducers/songPlayReducer';

const rootReducer = combineReducers({
  audioReducer,
  songPlayReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));