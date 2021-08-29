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


// export const removeFavorite = movie => dispatch => {
//   dispatch({
//     type: REMOVE_FAVORITE_ITEM,
//     payload: movie,
//   });
// };
export const changeSongIndex = (value) => dispatch =>{
  dispatch({ type: 'SONG_INDEX_CHANGED', payload: value});
}

export const changeSongVolume = (value) => dispatch =>{
  dispatch({ type: 'SONG_VOLUME_CHANGED', payload: value});
}

export const pauseSong = (songPlaybackInstance) => dispatch =>{
  console.log("action pauseSong")
  dispatch({ type: 'SONG_PAUSE_INITIATED', payload: songPlaybackInstance});
}

export const playSong = (songPlaybackInstance) => dispatch =>{
  console.log("action playSong")
  dispatch({ type: 'SONG_PLAY_INITIATED', payload: songPlaybackInstance});
}

export const loadSong = (songPlaybackInstance) => dispatch =>{
  console.log("action load song")
  dispatch({ type: 'SONG_LOADED', payload: songPlaybackInstance});
}

export const unloadSong = (songPlaybackInstance) => dispatch =>{
  console.log("action unload song")
  dispatch({ type: 'SONG_UNLOADED', payload: songPlaybackInstance});
}

  export const getSongList = () => {
    console.log("getSongList");
      try {
        return async dispatch => {
          // prob wrong place but does it work?
          dispatch({ type: 'SONGLIST_FETCH_STARTED' });
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


