import {createStore, combineReducers, applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import audioReducer from '../reducers/audioReducer';

// const rootReducer = combineReducers({
  // other reducer
//   audioReducer
// });


//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = createStore(audioReducer, applyMiddleware(thunk));