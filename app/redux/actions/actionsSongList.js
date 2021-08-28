import axios from 'axios';
import settings from "../../config/settings";
export const SONGLIST_FETCH_STARTED = 'SONGLIST_FETCH_STARTED';
export const SONGLIST_FETCH_COMPLETED = 'SONGLIST_FETCH_COMPLETED';
export const SONGLIST_FETCH_FAILED = 'SONGLIST_FETCH_FAILED';

export const getSongList = () => {
  console.log("getSongLst");
    try {
      // dispatch({ type: 'SONGLIST_FETCH_STARTED' })
      // console.log("action SONGLIST_FETCH_STARTED");
      return async dispatch => {
        const res = await axios.get(settings.apiUrl);
        if (res.data) {
          dispatch({
            type: SONGLIST_FETCH_COMPLETED,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
          dispatch({
            type: SONGLIST_FETCH_FAILED,
          });
        }
      };
    } catch (error) {
        console.log(error);
        dispatch({
          type: SONGLIST_FETCH_FAILED,
        });
    }
  };


// export const getSongList = () => dispatch => {
//   console.log("getSongLst");
//     try {
//       dispatch({ type: 'SONGLIST_FETCH_STARTED' })
//       console.log("action SONGLIST_FETCH_STARTED");
//       return async dispatch => {
//         const response = await fetch(
//           settings.apiUrl
//         );
//         if (response.status===200) {
//           console.log("200");
//           let json = await response.json();
//           console.log(json)
//           dispatch({
//             type: SONGLIST_FETCH_COMPLETED,
//             payload: json,
//           });
//         } else {
//           console.log("not 200");
//           dispatch({
//             type: SONGLIST_FETCH_FAILED,
//           });
//         }
//       };
//     } catch (error) {
//       // Add custom logic to handle errors
//       dispatch({
//         type: SONGLIST_FETCH_FAILED,
//       });
//     }
//   };