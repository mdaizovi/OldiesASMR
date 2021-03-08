import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

export default class AboutScreen extends React.Component {

	render() {
		return (
    <View style={styles.container}>

      <View>
        <Text style={styles.aboutText}>All Songs are streamed from US Library of Congress.
        </Text>
      </View>

      <View>
        <Text style={styles.aboutText}>All Sounds are either CC0 1.0 public domain sounds, or recorded by me. 
          There are a lot of skating sounds because I love to skate.
        </Text>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: colors.darkGrey,
		alignItems: 'center',
    paddingTop:50,
		width:'100%',
		alignSelf:'center'
  },
  aboutText: {
		fontSize: 22,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
	},
});
