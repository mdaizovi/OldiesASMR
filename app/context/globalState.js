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
render(){
 return (
  <playbackInstanceContext.Provider 
   value={{
    playbackInstances: this.state.playbackInstances,
    addNewPlaybackInstance: this.addNewPlaybackInstance,
    stopPlaybackInstances: this.stopPlaybackInstances
   }}
  >
   {this.props.children}
  </playbackInstanceContext.Provider>
 );
 }
}