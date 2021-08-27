import {AUDIO_STOP_REQUESTED} from '../actions/actionsAudio';


const initialState = {
  audioHasBeenStopped: false
};

//this tutorual has this as a const instead of a function
// https://medium.com/swlh/a-basic-redux-setup-in-react-react-native-c1670005dd70
function audioReducer(state = initialState, action) {
    switch (action.type) {
      case AUDIO_STOP_REQUESTED:
        console.log("action.payload");
        console.log(action.payload);
        return {
          ...state, 
          audioHasBeenStopped: action.payload
        };
        break
      // case REMOVE_FAVORITE_ITEM:
      //   return {
      //     ...state,
      //     favorites: state.favorites.filter(
      //       movie => movie.id !== action.payload.id,
      //     ),
      //   };
      default:
        return state;
    }
  }
export default audioReducer;