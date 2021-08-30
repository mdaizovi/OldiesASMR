import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import audioReducer from '../reducers/audioReducer';
import bullshitReducer from '../reducers/bullshitReducer';

const rootReducer = combineReducers({
  audioReducer,
  bullshitReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));