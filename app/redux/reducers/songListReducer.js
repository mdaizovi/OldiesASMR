import {SONGLIST_FETCH_STARTED, SONGLIST_FETCH_COMPLETED, SONGLIST_FETCH_FAILED} from '../actions/actionsSongList';

const initialState = {
  songListFetching: false,
  songList:[],
  songListFetchError:false,
  songIsLoading:true
}

const songListReducer = (state = initialState, action) => {
  // when we get the news that a fetch has started
  // we'll create and return a new object
  // This object, will contain all the properties
  // from current state, but.. will now also
  // set our `songListFetching` property to true
  if (action.type === 'SONGLIST_FETCH_STARTED') {
    return Object.assign({}, state, {
      songListFetching: true,
      songListFetchError:false,
      songIsLoading:true
    })
  }

  // when a fetch is complete, it will include results.
  // So now, we'll store the results from action.payload
  // and also make sure we set fetching and error back to `false`
  if (action.type === 'SONGLIST_FETCH_COMPLETED') {
    return Object.assign({}, state, {
      songList: action.payload,
      songListFetching: false,
      songListFetchError: false,
      songIsLoading:false
    })
  }

  if (action.type === 'SONGLIST_FETCH_FAILED') {
    return Object.assign({}, state, {
      songListFetching: false,
      songList: [],
      songListFetchError: true,
      songIsLoading:true
    })
  }

  // no matter what, we always return state
  return state
}

export default songListReducer;