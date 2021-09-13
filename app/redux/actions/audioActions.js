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
export const AUDIO_ADDED_TO_SOUND_LIST = 'AUDIO_ADDED_TO_SOUND_LIST'


export const changeSongIndex = (value) => dispatch =>{
  dispatch({ type: 'SONG_INDEX_CHANGED', payload: value});
}

export const changeSongVolume = (value) => dispatch =>{
  dispatch({ type: 'SONG_VOLUME_CHANGED', payload: value});
}

export const pauseSong = (songPlaybackInstance) => async dispatch =>{
  // maybe shouls say if is loaded nad if is playing?
  let songStatus = await songPlaybackInstance.getStatusAsync();
  if (songStatus.isLoaded === true && songStatus.isPlaying == true) {
    await songPlaybackInstance.pauseAsync();
    dispatch({ type: 'SONG_PAUSE_INITIATED'});
  }
}

export const playSong = (songPlaybackInstance) => async dispatch =>{
  let songStatus = await songPlaybackInstance.getStatusAsync();
  if (songStatus.isLoaded === true && songStatus.isPlaying == false) {
    await songPlaybackInstance.playAsync();
    dispatch({ type: 'SONG_PLAY_INITIATED', payload: songPlaybackInstance});
  }
}

export const loadSong = (songPlaybackInstance) => dispatch =>{
  dispatch({ type: 'SONG_LOADED', payload: songPlaybackInstance});
}

export const unloadSong = (songPlaybackInstance) => async dispatch =>{
  console.log("ACTION unloadSong");
  await songPlaybackInstance.stopAsync();
  await songPlaybackInstance.unloadAsync();
  dispatch({ type: 'SONG_UNLOADED'});
}

export const initiateStopAudio = () => dispatch => {
  dispatch({ type: 'AUDIO_STOP_REQUESTED'});
    // kept so i cna do for sounds
    //var songListLength = activeSongsArray.length;
  // for (var i = 0; i < songListLength; i++) {
  //     dispatch({
  //       type: 'SONG_UNLOADED',
  //       payload: activeSongsArray[i],
  //     });
  // }
  // var soundListLength = activeSoundsArray.length;
};

// export const audioAddedToSongList = (songPlaybackInstance) => dispatch => {
//   dispatch({ type: 'AUDIO_ADDED_TO_SONG_LIST', payload: songPlaybackInstance});
// };

// export const audioRemovedFromSongList = (activeSongsArray, songPlaybackInstance) => dispatch => {
//   const songArray = activeSongsArray;
//   var index = songArray.indexOf(songPlaybackInstance);
//   if (index > -1) {
//     songArray.splice(index, 1);
//   }
//   dispatch({ type: 'AUDIO_REMOVED_FROM_SONG_LIST', payload: activeSongsArray});
// };

export const audioAddedToSoundList = (songPlaybackInstance) => dispatch => {
  dispatch({ type: 'AUDIO_ADDED_TO_SOUND_LIST', payload: songPlaybackInstance});
};

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


