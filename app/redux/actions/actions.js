import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = 'b12c991089e5c2dbe78ca47918f9ee1b';
const PARAMS = 'page=1';
const BASE_URL = `${API_URL}?api_key=${API_KEY}&${PARAMS}`;

export const GET_MOVIES = 'GET_MOVIES';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';

export const AUDIO_STOP_REQUESTED = 'AUDIO_STOP_REQUESTED';

export const getMovies = () => {
    try {
      return async dispatch => {
        const res = await axios.get(`${BASE_URL}`);
        if (res.data) {
          dispatch({
            type: GET_MOVIES,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      // Add custom logic to handle errors
    }
  };

  export const addFavorite = movie => dispatch => {
    dispatch({
      type: ADD_FAVORITE_ITEM,
      payload: movie,
    });
  };

  export const removeFavorite = movie => dispatch => {
    dispatch({
      type: REMOVE_FAVORITE_ITEM,
      payload: movie,
    });
  };

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