import colors from "../config/colors";

import React, { Component, Section } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import AppStopButton from "../components/AppStopButton";
import AppCounter from "../redux/components/Counter";
import TimePicker from "../../submodules/react-native-super-timepicker";

class OptionsScreen extends Component {

  constructor() {
    super();
    this.state = {
      time: "",
    };
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.OptionsSegment}>

      <View style={styles.OptionsSegment}>
        <AppCounter/>
      </View>

      {/* <View style={styles.OptionsSegment}>
        <AppStopButton/>
        <Text style={styles.buttonText}>Stop Audio</Text>
      </View> */}
      
      </View>




      <View style={styles.OptionsSegment}>
        <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.button}
        >
        <Text style={styles.buttonText}>Sleep Timer</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.time}</Text>
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
       </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

	OptionsSegment: {
		flexDirection: 'row',
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.veryLightGrey,
	},
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: "center",
    //backgroundColor: "#fff",
    backgroundColor: colors.darkGrey,
    //paddingTop: 100,
    paddingHorizontal:20,
    width:'100%',
  },
  text: {
    fontSize: 20,
    marginTop: 10
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 50
  },
  buttonText: {
    fontSize: 22,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    paddingVertical:20,
    color: colors.black,
    fontWeight: "600"
  }
});

export default OptionsScreen;