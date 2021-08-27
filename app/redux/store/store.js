import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from '../reducers/moviesReducer';
import audioReducer from '../reducers/audioReducer';
import songListReducer from '../reducers/songListReducer';

const rootReducer = combineReducers({
  moviesReducer,
  audioReducer,
  songListReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));