import {
  SONGLIST_FETCH_STARTED, SONGLIST_FETCH_COMPLETED, SONGLIST_FETCH_FAILED,
  SONG_PLAY_INITIATED, SONG_PAUSE_INITIATED, 
  SONG_LOADED, SONG_UNLOADED,
  SONG_VOLUME_CHANGED, SONG_INDEX_CHANGED,
  AUDIO_STOP_REQUESTED, AUDIO_ADDED_TO_SONG_LIST , AUDIO_ADDED_TO_SOUND_LIST,
  AUDIO_STOP_COMPLETED
} from '../actions/audioActions';

const initialState = {
  songListFetching:false,
  songList:null,
  songListFetchError:false,

  songIsPlaying: false,
  songPlaybackInstance:null,
  currentIndex:0,
  volume:0.75,

  audioHasBeenStopped: false,
  activeSongsArray: [],
  activeSoundsArray: [],
}


function audioReducer(state = initialState, action) {
  switch (action.type) {
    case SONGLIST_FETCH_STARTED:
      return {...state, songListFetching: true, songListFetchError:false,};
    case SONGLIST_FETCH_COMPLETED:
      return {...state, songList: action.payload, songListFetching: false, songListFetchError: false,};
    case SONGLIST_FETCH_FAILED:
      return {
        ...state,
        songListFetching: false,songList: [],songListFetchError: true,
      };
    case SONG_LOADED:
      return {...state, songPlaybackInstance:action.payload};
    case SONG_UNLOADED:
        console.log("reducer song unladed");
        return {...state};
    case SONG_PLAY_INITIATED:
      return {...state, songPlaybackInstance:action.payload, songIsPlaying:true, audioHasBeenStopped:false};        
    case SONG_PAUSE_INITIATED:
      return {...state, songIsPlaying:false};      
    case SONG_INDEX_CHANGED:
      return {...state, currentIndex: action.payload};
    case SONG_VOLUME_CHANGED:
      return {...state, volume: action.payload};
    
    case AUDIO_STOP_REQUESTED:
      return {
        ...state, 
        audioHasBeenStopped: true
      };
    case AUDIO_ADDED_TO_SONG_LIST:
      return {
        ...state, activeSongsArray: [...state.activeSongsArray, action.payload]
      };    
    case AUDIO_ADDED_TO_SOUND_LIST:
      return {
        ...state,  activeSoundsArray: state.activeSoundsArray.concat(action.payload)
      };
    // case AUDIO_REMOVED_FROM_SONG_LIST:
    //   return {
    //     ...state, activeSongsArray: action.payload
    //   };  
     //note the 2 methods of adding a sound item to a sounf/song array should be the same, i just tried 2 different ways, don't know why.    
     case AUDIO_STOP_COMPLETED:
      return {
        ...state, 
        songIsPlaying: false,
        activeSongsArray: [],
        activeSoundsArray: [],
      };
    
     default:
      return state;

  }
}
export default audioReducer;