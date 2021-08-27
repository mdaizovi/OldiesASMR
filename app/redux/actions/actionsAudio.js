export const AUDIO_STOP_REQUESTED = 'AUDIO_STOP_REQUESTED';

  // is dispatch just for async?
  // export const stopAllAudio = () => dispatch => {
  //   dispatch({
  //     type: AUDIO_STOP_REQUESTED,
  //     payload: false,
  //   });
  // };
  export const stopAllAudio = () => {
    return{
      type: AUDIO_STOP_REQUESTED,
      //payload is optional
      payload: true,
    };
  };