import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View,  Dimensions} from "react-native";
import colors from "../config/colors";
import { Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av'
import logger from '../utilities/logger';  

var deviceWidth = Dimensions.get('window').width; //full width

export default class AppSoundItem extends Component {
	state = {isLoaded: false, isPlaying: false, volume: 0.25, soundObject: new Audio.Sound()};
	
	handlePlaySound = async arrayObj => {
		let { isLoaded, volume, isPlaying, soundObject } = this.state
		try {
			if (isLoaded === false) {
				await soundObject.loadAsync(arrayObj.soundFile)
				.catch(error => {
					logger.log(error);
				})
				soundObject.setStatusAsync({ volume: volume })
				this.setState({
					isLoaded : true,
				})
			}

			if (isPlaying === true) {
				await soundObject.pauseAsync()
				.catch(error => {
					logger.log(error);
				})
				this.setState({
					isPlaying : false
				}) 
			}  else {
				soundObject.setIsLoopingAsync(true)
				await soundObject.playAsync()
				.catch(error => {
					logger.log(error);
				})
				this.setState({
					isPlaying : true
				}) 
		   }

		} catch (error) {
			logger.log(error);
		}
	}

	handleSlide = async (value) => {
		let { isLoaded, soundObject, isPlaying } = this.state
		if (isLoaded === true) {
			soundObject.setStatusAsync({ volume: value })
		}
		this.setState({
			volume: value,
		}) 
	}

	playIfNotPlaying = async arrayObj => {
		let {isPlaying } = this.state
		try {
		   if (isPlaying === false) {
			this.handlePlaySound(arrayObj);
			}
		} catch (error) {
			logger.log(error);
		}
	}

	render() {
		return (
			<View style={styles.soundContainer}>

				<TouchableOpacity style={[styles.button]} onPress={() => this.handlePlaySound(this.props.arrayObj)}>
					{this.state.isPlaying ? (
					<>
					<Text style={[styles.buttonText, styles.buttonTextActive]}>{this.props.arrayObj.name}</Text>
					</>
					) : (
						<>
						<Text style={[styles.buttonText, styles.buttonTextInactive]}>{this.props.arrayObj.name}</Text>
						</>
					)}
				</TouchableOpacity>


				{this.state.isPlaying ? (
					<Slider
						style={styles.volumeSlider}
						minimumValue={0}
						maximumValue={1}
						minimumTrackTintColor={colors.veryLightGrey}
						maximumTrackTintColor={colors.active}
						thumbTintColor={colors.active}
						value={this.state.volume}
						onValueChange={value => this.handleSlide(value)}
					/>
				) : (
					<Slider
						style={styles.volumeSlider}
						minimumValue={0}
						maximumValue={1}
						minimumTrackTintColor={colors.veryDarkGrey}
						maximumTrackTintColor={colors.inactive}
						thumbTintColor={colors.inactive}
						value={this.state.volume}
						onValueChange={value => this.handleSlide(value)}
						onSlidingComplete = {() => this.playIfNotPlaying(this.props.arrayObj)}
				/>
				)}
			</View>
		  );
		  
		}
  	}
  

  const styles = StyleSheet.create({
	control: {
		margin: 20
	},
	soundContainer: {
		height: 120,
		width:deviceWidth,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	volumeSlider: {
		width: 200, 
		height: 40
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 22,
		padding: 10,
		height: 50,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
	},
	buttonTextActive: {
		color: colors.active,
		fontWeight: "bold"
	},
	buttonTextInActive: {
		color: colors.inactive,
	}
})