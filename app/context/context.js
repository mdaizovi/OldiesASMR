import React from 'react';

export default playbackInstanceContext = React.createContext({
  playbackInstances: [],
  addNewTask : (task) => {},
  removeTask : (taskId) => {},
  addNewPlaybackInstance : (playbackInstance) => {},
  stopAllPlaybackInstances : () => {}
});