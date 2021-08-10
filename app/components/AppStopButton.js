import React, {useContext}  from "react";
import { Ionicons } from '@expo/vector-icons' 
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import {stopAllAudio} from '../redux/actions/actions';


//const AppStopButton = (onPress, isPlaying ) => {
export default function AppStopButton({isPlaying}) {
  //const {audioShouldPlay} = useSelector(state => state.audioReducer);
  const dispatch = useDispatch();
  const stopAllAudio = () => dispatch(stopAllAudio());
  const handleStopAllAudio = () => {
    stopAllAudio();
  };

  return (
    <TouchableOpacity style={styles.control}  onPress={handleStopAllAudio}>
      {isPlaying ? (
        <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
      ) : (
        <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
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


