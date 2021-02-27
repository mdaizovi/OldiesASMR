import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppSoundButton({ name, isPlaying, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
    >
    {isPlaying ? (
      <Text style={[styles.buttonText, styles.buttonTextActive]}>{ name }</Text>
    ) : (
		<Text style={[styles.buttonText, styles.buttonTextInactive]}>{ name }</Text>
    )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 22
	},
	buttonTextActive: {
		color: colors.active,
		fontWeight: "bold"
	},
	buttonTextInActive: {
		color: colors.inactive,
	},
	trackInfo: {
		padding: 40,
		backgroundColor: colors.inactive,
	},
	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
	
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
})

export default AppSoundButton;
