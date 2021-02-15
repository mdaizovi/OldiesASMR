import React from "react";
import { MaterialIcons } from '@expo/vector-icons'; 
import { StyleSheet, TouchableOpacity } from "react-native";

function AppPlayerButton({ iconName, onPress}) {
  return (
    <TouchableOpacity style={styles.control} onPress={onPress}>
      <MaterialIcons name={iconName} size={48} color="#444" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	control: {
		margin: 20
	},
})

export default AppPlayerButton;
