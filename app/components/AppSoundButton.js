import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppSoundButton({ name, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
    >
    <Text style={styles.buttonText}>{ name }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	buttonContainer: {
		height: 40,
		margin: 5,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.purple,
	},
	buttonText: {
		color: colors.blue,
		fontSize: 18
	}
})

export default AppSoundButton;
