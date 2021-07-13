import React from "react";
import { Ionicons } from '@expo/vector-icons' 
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import playbackInstanceContext from "../context/playbackInstanceContext"

function AppStopButton({ onPress, isPlaying }) {
  return (
    <playbackInstanceContext.Consumer>
      {({playbackInstances, stopPlaybackInstances}) => (
        <TouchableOpacity style={styles.control}  onPress={stopPlaybackInstances}>
          {isPlaying ? (
            <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
          ) : (
            <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
          )}
        </TouchableOpacity>
      )}
    </playbackInstanceContext.Consumer>
  );
}

const styles = StyleSheet.create({
	control: {
		margin: 15
	},
})

export default AppStopButton;
