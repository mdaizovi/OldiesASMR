import React from "react";
import { Text, StyleSheet, View } from "react-native";
import colors from "../config/colors";

export default class AboutScreen extends React.Component {

	render() {
		return (
      <View style={styles.container}>
        <View>
          <Text style={styles.aboutText}>All Songs are streamed from US Library of Congress.
          </Text>

          <Text style={styles.aboutText}>
            There are a lot of skating sounds because I love to skate, and find it relaxing to listen to.
          </Text>

          <Text style={styles.aboutText}>Please send questions, comments, concerns, sound suggestions, 
            and especially love letters, to listen@oldiesinanotherroom.com
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
