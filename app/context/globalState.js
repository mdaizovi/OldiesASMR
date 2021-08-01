import React from 'react';
import playbackInstanceContext from './context';

export default class GlobalState extends React.Component{
state = {
  playbackInstances: [],
}
 
addNewTask = (task) => {
  const list = this.state.playbackInstances;
  list.push(task);
  this.setState({playbackInstances: list});
};

removeTask = (taskId) => {
  this.setState(this.state.playbackInstances.splice(taskId,1));
};


addNewPlaybackInstance = async (playbackInstance) => {
  console.log("start addNewPlaybackInstance")
  const list = this.state.playbackInstances;
  list.push(playbackInstance);
  this.setState({playbackInstances: list});
  console.log("end addNewPlaybackInstance")
};

removePlaybackInstance = (playbackInstance) => {
  console.log("start removePlaybackInstance")
  const list = this.state.playbackInstances;
  var index = list.indexOf(playbackInstance);
  list.splice(index, 1);
  this.setState({playbackInstances: list});
  console.log("end removePlaybackInstance")
};

stopAllPlaybackInstances = () => {
  console.log("stopAllPlaybackInstances");
  // iterate and stop all audio properly unmount or whatever.
  // make sure play buttons look right, resume appropriately.
  const list = this.state.playbackInstances;
  console.log(list);
  // i can see the print statements but objects reamain. don't know if this is bc list isn't getting updated
  // or if just not getting re rendered.
  this.setState({playbackInstances: []});
};

render(){
 return (
  <playbackInstanceContext.Provider 
   value={{
    playbackInstances: this.state.playbackInstances,
    addNewTask: this.addNewTask,
    removeTask: this.removeTask,
    addNewPlaybackInstance: this.addNewPlaybackInstance,
    removePlaybackInstance: this.removePlaybackInstance,
    stopAllPlaybackInstances: this.stopAllPlaybackInstances
   }}
  >
   {this.props.children}
  </playbackInstanceContext.Provider>
 );
 }
}