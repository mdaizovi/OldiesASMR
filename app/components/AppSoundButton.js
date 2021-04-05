import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { Platform } from 'react-native';

class AppSoundButton extends Component {
	state = { isPlaying: false };
	render() {
		return (
			<TouchableOpacity
			  style={[styles.button]}
			  onPress={this.props.onPress}
			>
			
			{this.state.isPlaying ? (
			  <Text style={[styles.buttonText, styles.buttonTextActive]}>{ this.props.name }</Text>
			) : (
				<Text style={[styles.buttonText, styles.buttonTextInactive]}>{ this.props.name }</Text>
			)}

			</TouchableOpacity>
		  );
	}
  }
  
