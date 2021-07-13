import React from "react";
import { Ionicons } from '@expo/vector-icons' 
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppStopButton({ onPress, isPlaying }) {
  return (
    <TouchableOpacity style={styles.control}  onPress={onPress}>
    {isPlaying ? (
      <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
    ) : (
      <Ionicons name='ios-stop-circle' size={48} color={colors.active} />
    )}
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	control: {
		margin: 15
	},
})

export default AppStopButton;
