import { createStore, combineReducers } from 'redux';
import simpleCounterReducer from "../reducers/reducer"

//export default createStore(simpleCounterReducer)

const configureStore = () => {
    return createStore(simpleCounterReducer);
    }
export default configureStore;