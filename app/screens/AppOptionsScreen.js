import React from "react";
import { Text, StyleSheet, View } from "react-native";
import colors from "../config/colors";

export default class OptionsScreen extends React.Component {

	render() {
		return (
      <View style={styles.container}>
        <View>
          <Text style={styles.aboutText}>here's where the Stop button and picker form will be
          </Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: colors.lightGrey,
    paddingHorizontal:20,
		width:'100%',
  },
  aboutText: {
		fontSize: 22,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    paddingVertical:20,
	},
});
