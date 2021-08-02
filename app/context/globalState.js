import React from 'react';
import playbackInstanceContext from './context';

function get(object, key, default_value) {
  var result = object[key];
  return (typeof result !== "undefined") ? result : default_value;
}

export default class GlobalState extends React.Component{
state = {
  playbackInstances: {},
}
 


addNewPlaybackInstance = async (key, playbackInstance) => {
  console.log("start addNewPlaybackInstance")
  const playbackInstancesDict = this.state.playbackInstances;
  //const list = playbackInstancesDict[key]
  const list = get(playbackInstancesDict, key, []);
  console.log(key)
  console.log(Object.keys(playbackInstancesDict).length)
  console.log(list.length)
  list.push(playbackInstance);
  console.log(list.length)
  // do i need to put list back or is it good?
  playbackInstancesDict[key] = list
  this.setState({playbackInstances: playbackInstancesDict});
  console.log("end addNewPlaybackInstance")
};

removePlaybackInstance = (key, playbackInstance) => {
  console.log("start removePlaybackInstance")
  const playbackInstancesDict = this.state.playbackInstances;
  const list = get(playbackInstancesDict, key, []);
  console.log(key)
  console.log(Object.keys(playbackInstancesDict).length)
  console.log(list.length)
  var index = list.indexOf(playbackInstance);
  list.splice(index, 1);
    // do i need to put list back or is it good?
  playbackInstancesDict[key] = list
  this.setState({playbackInstances: playbackInstancesDict});
  console.log("end removePlaybackInstance")
};

stopAllPlaybackInstances = () => {
  console.log("stopAllPlaybackInstances");
  // iterate and stop all audio properly unmount or whatever.
  // make sure play buttons look right, resume appropriately.
  const dict = this.state.playbackInstances;
  for (var key in dict){
    const list = dict[key]
    console.log(key);
    for (const sounditem of list){
      console.log("remove from list and stop/pause/unmount as appripriate");
    }
  }
  // i can see the print statements but objects reamain. don't know if this is bc list isn't getting updated
  // or if just not getting re rendered.
  this.setState({playbackInstances: {}});
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