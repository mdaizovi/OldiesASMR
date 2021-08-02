import React from 'react';

export default playbackInstanceContext = React.createContext({
  playbackInstances: {},
  addNewPlaybackInstance : (key, playbackInstance) => {},
  removePlaybackInstance:(key, playbackInstance) => {},
  stopAllPlaybackInstances : () => {}
});