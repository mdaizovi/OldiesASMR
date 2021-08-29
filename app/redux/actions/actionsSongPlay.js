import axios from 'axios';
import settings from "../../config/settings";

export const SONGLIST_FETCH_STARTED = 'SONGLIST_FETCH_STARTED';
export const SONGLIST_FETCH_COMPLETED = 'SONGLIST_FETCH_COMPLETED';
export const SONGLIST_FETCH_FAILED = 'SONGLIST_FETCH_FAILED';

export const SONG_PLAY_INITIATED = 'SONG_PLAY_INITIATED';
export const SONG_PAUSE_INITIATED = 'SONG_PAUSE_INITIATED';
export const SONG_LOADED = 'SONG_LOADED';
export const SONG_UNLOADED = 'SONG_UNLOADED';

//export const SONG_PLAY_ENDED = 'SONG_PLAY_FINISHED';
export const SONG_VOLUME_CHANGED = 'SONG_VOLUME_CHANGED';
export const SONG_INDEX_CHANGED = 'SONG_INDEX_CHANGED';

export const changeSongIndex = (value) => {
  dispatch({ type: 'SONG_INDEX_CHANGED', payload: value})
}

export const changeSongVolume = (value) => {
  dispatch({ type: 'SONG_VOLUME_CHANGED', payload: value})
}

export const pauseSong = () => {
  console.log("action pauseSong")
  dispatch({ type: 'SONG_PAUSE_INITIATED'})
}

export const playSong = () => {
  console.log("action playSong")
  dispatch({ type: 'SONG_PLAY_INITIATED'})
}

export const loadSong = (songplaybackInstance) => {
  console.log("action load song")
  dispatch({ type: 'SONG_LOADED', payload: songplaybackInstance})
}

export const unloadSong = (songplaybackInstance) => {
  console.log("action unload song")
  dispatch({ type: 'SONG_UNLOADED', payload: songplaybackInstance})
}

  export const getSongList = () => {
    console.log("getSongList");
      try {
        return async dispatch => {
          // prob wrong place but does it work?
          dispatch({ type: 'SONGLIST_FETCH_STARTED' })
          console.log("action SONGLIST_FETCH_STARTED");
          // end wrong place(?) disptch
          
          const res = await axios.get(settings.apiUrl);
          if (res.data) {
            console.log("action SONGLIST_FETCH_COMPLETED");
            dispatch({
              type: SONGLIST_FETCH_COMPLETED,
              payload: res.data,
            });
          } else {
            console.log("action SONGLIST_FETCH_FAILED 1");
            dispatch({
              type: SONGLIST_FETCH_FAILED,
            });
          }
        };
      } catch (error) {
        console.log("action SONGLIST_FETCH_FAILED 2");
          console.log("error: ",error);
          dispatch({
            type: SONGLIST_FETCH_FAILED,
          });
      }
    };


//put this back later,
export const noteSkippedSong = async (song_id) => {
  /// Tells BE this song was skipped so we can know which songs everyone hates
  console.log("noteSkippedSong");
  fetch(settings.skipUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      song: song_id,
    })
    });
  };


