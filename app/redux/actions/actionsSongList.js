import settings from "../../config/settings";
export const SONGLIST_FETCH_STARTED = 'SONGLIST_FETCH_STARTED';
export const SONGLIST_FETCH_COMPLETED = 'SONGLIST_FETCH_COMPLETED';
export const SONGLIST_FETCH_FAILED = 'SONGLIST_FETCH_FAILED';

// export const getMovies = () => {
//     try {
//       return async dispatch => {
//         const res = await axios.get(`${BASE_URL}`);
//         if (res.data) {
//           dispatch({
//             type: GET_MOVIES,
//             payload: res.data,
//           });
//         } else {
//           console.log('Unable to fetch');
//         }
//       };
//     } catch (error) {
//       // Add custom logic to handle errors
//     }
//   };

export const getSongList = () => {
    try {
      dispatch({ type: 'SONGLIST_FETCH_STARTED' })
      return async dispatch => {
        const response = await fetch(
          settings.apiUrl
        );
        if (response.status===200) {
          let json = await response.json();
          dispatch({
            type: SONGLIST_FETCH_COMPLETED,
            payload: json,
          });
        } else {
          dispatch({
            type: SONGLIST_FETCH_FAILED,
          });
        }
      };
    } catch (error) {
      // Add custom logic to handle errors
      dispatch({
        type: SONGLIST_FETCH_FAILED,
      });
    }
  };