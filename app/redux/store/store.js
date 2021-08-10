import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from '../reducers/moviesReducer';
import audioReducer from '../reducers/audioReducer';

const rootReducer = combineReducers({
  moviesReducer,
  audioReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));