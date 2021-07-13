import React from 'react';

export default playbackInstanceContext = React.createContext({
  playbackInstances: [],
  addNewPlaybackInstance : (task) => {},
  stopPlaybackInstances : (taskId) => {}
});