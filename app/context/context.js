import React from 'react';

export default playbackInstanceContext = React.createContext({
  playbackInstances: {},
  songState: {},
  addNewPlaybackInstance : (key, playbackInstance) => {},
  removePlaybackInstance:(key, playbackInstance) => {},
  stopAllPlaybackInstances : () => {}
});