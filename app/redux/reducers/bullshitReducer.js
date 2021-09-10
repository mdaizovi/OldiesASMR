import {BULLSHIT} from '../actions/bullshitActions';

const initialState = {
  bullshit: false
};

function bullshitReducer(state = initialState, action) {
    switch (action.type) {
      case BULLSHIT:
        return {
          ...state,
        };
      default:
        return state;
    }
  }
export default bullshitReducer;