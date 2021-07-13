import React, {useContext}  from "react";
import { Ionicons } from '@expo/vector-icons' 
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import playbackInstanceContext from '../context/context';

//const AppStopButton = (onPress, isPlaying ) => {
// function AppStopButton({ onPress, isPlaying }) {
//   return (
//     <TouchableOpacity style={styles.control}  onPress={onPress}>
//       {isPlaying ? (
//         <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
//       ) : (
//         <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
//       )}
//     </TouchableOpacity>
// );
// }


export default class AppStopButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isPlaying : props.isPlaying
      //isPlaying : true
    }
   }
  static contextType = playbackInstanceContext;

  render(){
   return (
    <TouchableOpacity style={styles.control} onPress={()=>this.context.stopAllPlaybackInstances()}>
      {this.state.isPlaying ? (
        <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
      ) : (
        <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
      )}
    </TouchableOpacity>
    );
   }
};



const styles = StyleSheet.create({
	control: {
		margin: 15
	},
})


