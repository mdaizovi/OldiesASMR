import axios from 'axios';
import settings from "../../config/settings";

export const SONGLIST_FETCH_STARTED = 'SONGLIST_FETCH_STARTED';
export const SONGLIST_FETCH_COMPLETED = 'SONGLIST_FETCH_COMPLETED';
export const SONGLIST_FETCH_FAILED = 'SONGLIST_FETCH_FAILED';

export const SONG_PLAY_INITIATED = 'SONG_PLAY_INITIATED';
export const SONG_PAUSE_INITIATED = 'SONG_PAUSE_INITIATED';
export const SONG_LOADED = 'SONG_LOADED';
export const SONG_UNLOADED = 'SONG_UNLOADED';

export const SONG_VOLUME_CHANGED = 'SONG_VOLUME_CHANGED';
export const SONG_INDEX_CHANGED = 'SONG_INDEX_CHANGED';

export const AUDIO_STOP_REQUESTED = 'AUDIO_STOP_REQUESTED';

export const changeSongIndex = (value) => dispatch =>{
  dispatch({ type: 'SONG_INDEX_CHANGED', payload: value});
}

export const changeSongVolume = (value) => dispatch =>{
  dispatch({ type: 'SONG_VOLUME_CHANGED', payload: value});
}

export const pauseSong = (songPlaybackInstance) => async dispatch =>{
  await songPlaybackInstance.pauseAsync();
  dispatch({ type: 'SONG_PAUSE_INITIATED'});
}

export const playSong = (songPlaybackInstance) => async dispatch =>{
  await songPlaybackInstance.playAsync();
  dispatch({ type: 'SONG_PLAY_INITIATED'});
}

export const loadSong = (songPlaybackInstance) => dispatch =>{
  dispatch({ type: 'SONG_LOADED', payload: songPlaybackInstance});
}

export const unloadSong = (songPlaybackInstance) => async dispatch =>{
  await songPlaybackInstance.unloadAsync();
  dispatch({ type: 'SONG_UNLOADED'});
}

export const stopAllAudio = () => async dispatch =>{
  dispatch({ type: 'AUDIO_STOP_REQUESTED'});
}


  export const getSongList = () => {
      try {
        return async dispatch => {
          // prob wrong place but does it work?
          dispatch({ type: 'SONGLIST_FETCH_STARTED' });
          // end wrong place(?) disptch
          
          const res = await axios.get(settings.apiUrl);
          if (res.data) {
            dispatch({
              type: SONGLIST_FETCH_COMPLETED,
              payload: res.data,
            });
          } else {
            dispatch({
              type: SONGLIST_FETCH_FAILED,
            });
          }
        };
      } catch (error) {
          dispatch({
            type: SONGLIST_FETCH_FAILED,
          });
      }
    };


