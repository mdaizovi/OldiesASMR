import {
  SONGLIST_FETCH_STARTED, SONGLIST_FETCH_COMPLETED, SONGLIST_FETCH_FAILED,
  SONG_PLAY_INITIATED, SONG_PAUSE_INITIATED, 
  SONG_LOADED, SONG_UNLOADED,
  SONG_VOLUME_CHANGED, SONG_INDEX_CHANGED
} from '../actions/actionsSongPlay';

const initialState = {
  songListFetching:false,
  songList:null,
  songListFetchError:false,

  songIsPlaying: false,
  songPlaybackInstance:null,
  currentIndex:0,
  volume:0.75
}


function songPlayReducer(state = initialState, action) {
  console.log("---song play reducer---");
  switch (action.type) {
    case SONGLIST_FETCH_STARTED:
      console.log("reducer: SONGLIST_FETCH_STARTED");
      return {...state, songListFetching: true, songListFetchError:false,};
    case SONGLIST_FETCH_COMPLETED:
      console.log("reducer: SONGLIST_FETCH_COMPLETED");
      return {...state, songList: action.payload, songListFetching: false, songListFetchError: false,};
    case SONGLIST_FETCH_FAILED:
      console.log("reducer: SONGLIST_FETCH_FAILED");
      return {
        ...state,
        songListFetching: false,songList: [],songListFetchError: true,
      };
    case SONG_LOADED:
      console.log("reducer: SONG_LOADED");
      return {...state, songPlaybackInstance:action.payload};
    case SONG_UNLOADED:
        console.log("reducer: SONG_UNLOADED");
        return {...state, songPlaybackInstance:null, songIsPlaying:false};
    case SONG_PLAY_INITIATED:
      console.log("reducer: SONG_PLAY_INITIATED");
      return {...state, songIsPlaying:true};        
    case SONG_PAUSE_INITIATED:
      console.log("reducer: SONG_PAUSE_INITIATED");
      return {...state, songIsPlaying:false};      
    case SONG_INDEX_CHANGED:
      console.log("SONG_INDEX_CHANGED");
      return {...state, currentIndex: action.payload};
      case SONG_VOLUME_CHANGED:
      console.log("SONG_VOLUME_CHANGED");
      return {...state, volume: action.payload};
    default:
      return state;
  }
}
export default songPlayReducer;