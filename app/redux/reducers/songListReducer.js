import {SONGLIST_FETCH_STARTED, SONGLIST_FETCH_COMPLETED, SONGLIST_FETCH_FAILED} from '../actions/actionsSongList';

const initialState = {
  songListFetching: false,
  songList:null,
  songListFetchError:false,
}


function songListReducer(state = initialState, action) {
  console.log("---songlist reducer---");
  switch (action.type) {
    case SONGLIST_FETCH_STARTED:
      console.log("SONGLIST_FETCH_STARTED");
      return {...state, songListFetching: true,songListFetchError:false,};
    case SONGLIST_FETCH_COMPLETED:
      console.log("SONGLIST_FETCH_completed");
      return {...state, songList: action.payload,songListFetching: false,songListFetchError: false,};
    case SONGLIST_FETCH_FAILED:
      console.log("SONGLIST_FETCH_failed");
      return {
        ...state,
        songListFetching: false,songList: [],songListFetchError: true,
      };
    default:
      return state;
  }
}
export default songListReducer;