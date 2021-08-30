import React, {useContext}  from "react";
import { Ionicons } from '@expo/vector-icons' 
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import {stopAllAudio} from '../redux/actions/audioActions';
import {useDispatch, useSelector} from 'react-redux';

export default AppStopButton = () => {
  const {songIsPlaying} = useSelector(state => state.audioReducer);
  const dispatch = useDispatch();


  const dispatchedStopAllAudio = () => {
    dispatch(stopAllAudio())
  };

  return (
    <TouchableOpacity style={styles.control}  onPress={dispatchedStopAllAudio}>
      {songIsPlaying ? (
        <Ionicons name='ios-stop-circle' size={48} color={colors.red} />
      ) : (
        <Ionicons name='ios-stop-circle' size={48} color={colors.inactive} />
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
})


