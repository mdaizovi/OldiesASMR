import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from '../reducers/moviesReducer';
import audioReducer from '../reducers/audioReducer';
import songPlayReducer from '../reducers/songPlayReducer';

const rootReducer = combineReducers({
  moviesReducer,
  audioReducer,
  songPlayReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));