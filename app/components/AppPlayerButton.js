import React from "react";
import { MaterialIcons } from '@expo/vector-icons'; 
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppPlayerButton({ iconName, onPress}) {
  return (
    <TouchableOpacity style={styles.control} onPress={onPress}>
      <MaterialIcons name={iconName} size={48} color={colors.active} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	control: {
		margin: 20
	},
})

export default AppPlayerButton;
