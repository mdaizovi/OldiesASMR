import React from "react";
import { Ionicons } from '@expo/vector-icons' 
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppPlayPauseButton({ onPress, songIsPlaying }) {
  return (
    <TouchableOpacity style={styles.control}  onPress={onPress}>
    {songIsPlaying ? (
      <Ionicons name='ios-pause' size={48} color={colors.active} />
    ) : (
      <Ionicons name='ios-play-circle' size={48} color={colors.active} />
    )}
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	control: {
		margin: 20
	},
})

export default AppPlayPauseButton;
