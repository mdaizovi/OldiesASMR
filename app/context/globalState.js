import React from 'react';
import playbackInstanceContext from './context';
export default class GlobalState extends React.Component{
state = {
  playbackInstances: [],
}
 
addNewPlaybackInstance = (task) => {
  const list = [this.state.playbackInstances, task];
  this.setState({playbackInstances: list});
};
 
stopPlaybackInstances = (taskId) => {
  this.setState(this.state.playbackInstances.splice(taskId,1));
};

stopAllPlaybackInstances = () => {
  console.log("stopAllPlaybackInstances");
  // iterate and stop all audio properly unmount or whatever.
  // make sure play buttons look right, resume appropriately.

  // i can see the print statements but objects reamain. don't know if this is bc list isn't getting updated
  // or if just not getting re rendered.
  this.setState({playbackInstances: []});
};

render(){
 return (
  <playbackInstanceContext.Provider 
   value={{
    playbackInstances: this.state.playbackInstances,
    addNewPlaybackInstance: this.addNewPlaybackInstance,
    stopPlaybackInstances: this.stopPlaybackInstances,
    stopAllPlaybackInstances: this.stopAllPlaybackInstances
   }}
  >
   {this.props.children}
  </playbackInstanceContext.Provider>
 );
 }
}