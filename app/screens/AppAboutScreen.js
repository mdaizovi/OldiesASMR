import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

export default class AboutScreen extends React.Component {

	render() {
		return (
    <View style={styles.container}>

      <Text>All Songs are streamed from US Library of Congress.
		</Text>

      <Text>All Sounds are either CC0 1.0 public domain sounds, or recorded by me. 
		  There are a lot of skating sounds because I love to skate.
		</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center', 
  },
});
