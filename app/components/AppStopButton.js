import React, {useContext}  from "react";
import { Ionicons } from '@expo/vector-icons' 
import { StyleSheet, TouchableOpacity, Text} from "react-native";
import colors from "../config/colors";
import {stopAllAudio} from '../redux/actions/audioActions';
import {useDispatch, useSelector} from 'react-redux';

export default AppStopButton = () => {
  const {songIsPlaying, activeSongsArray, activeSoundsArray} = useSelector(state => state.audioReducer);
  const dispatch = useDispatch();


  const dispatchedStopAllAudio = () => {
    dispatch(stopAllAudio(activeSongsArray, activeSoundsArray))
  };

  return (
    <TouchableOpacity style={styles.control}  onPress={dispatchedStopAllAudio}>
      {songIsPlaying ? (
        <>
        <Ionicons name='ios-stop-circle' size={48} color={colors.red} />
        <Text style={[styles.stopButtonText]}>
        Stop Audio
      </Text>
      </>
      ) 
      : 
      (
        <>
        <Ionicons name='ios-stop-circle' size={48} color={colors.inactive} />
        <Text style={[styles.stopButtonText]}>
        Audio Stopped
      </Text>
      </>
      )}
    </TouchableOpacity>
);
}


// export default class AppStopButton extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       isPlaying : props.isPlaying
//       //isPlaying : true
//     }
//    }

//   render(){
//    return (
//     <TouchableOpacity style={styles.control} onPress={()=>this.context.stopAllPlaybackInstances()}>
//       {this.state.isPlaying ? (
//         <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
//       ) : (
//         <Ionicons name='ios-stop-circle' size={48} color={colors.inactive} />
//       )}
//     </TouchableOpacity>
//     );
//    }
// };



const styles = StyleSheet.create({
	control: {
		margin: 15
	},
  stopButtonText: {
		margin: 5,
		height: 15,
		top:5,
    fontStyle: 'italic',
		fontSize: 16,
		color: colors.black,
	},
})


