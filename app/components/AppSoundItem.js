import React, { Component, useState, useEffect  } from "react";
import { StyleSheet, Text, TouchableOpacity, View,  Dimensions} from "react-native";
import colors from "../config/colors";
import { Platform } from 'react-native';
import Slider from '@react-native-community/slider';

var deviceWidth = Dimensions.get('window').width; //full width

//class AppSoundItem extends Component {
export default class AppSoundItem extends Component {
	//props: name, file, sound.soundObject = new Audio.Sound();
	state = {isLoaded: false, isPlaying: false, volume: 0.25};
	
	handlePlaySound = async arrayObj => {
		const soundObject = arrayObj.soundObject
		let { isLoaded, volume, isPlaying } = this.state
		console.log("----handle play sound")
		console.log(arrayObj)
		try {
			if (isLoaded === false) {
				await soundObject.loadAsync(arrayObj.soundFile)
				.catch(error => {
					console.log(error)
				})
				soundObject.setStatusAsync({ volume: volume })
				this.setState({
					isLoaded : true,
				})
			}

			if (isPlaying === true) {
				console.log("is playing")
				await soundObject.pauseAsync()
				.catch(error => {
					console.log(error)
				})
				this.setState({
					isPlaying : false
				}) 
			}  else {
				console.log("is not playing")
				soundObject.setIsLoopingAsync(true)
				await soundObject.playAsync()
				.catch(error => {
					console.log(error)
				})
			this.setState({
				isPlaying : true
			}) 
		   }
		   
		} catch (error) {
			console.log(error)
		}
	console.log("----")
	}

	handleSlide = async (soundObject, value) => {
		let { isLoaded} = this.state
		this.setState({
			volume: value,
		}) 
		if (isLoaded === true) {
			soundObject.setStatusAsync({ volume: value })
		}
	}

	render() {
		return (
		  
			<View style={styles.soundContainer}>

			<TouchableOpacity style={[styles.button]} onPress={() => this.handlePlaySound(this.props.arrayObj)}>
				{this.state.isPlaying ? (
				<Text style={[styles.buttonText, styles.buttonTextActive]}>{this.props.arrayObj.name}</Text>
				) : (
					<Text style={[styles.buttonText, styles.buttonTextInactive]}>{this.props.arrayObj.name}</Text>
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
					onValueChange={value => this.handleSlide(this.props.arrayObj.soundObject, value)}
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
					onValueChange={value => this.handleSlide(this.props.arrayObj.soundObject, value)}
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
		height: 100,
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
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
	},
	buttonTextActive: {
		color: colors.active,
		fontWeight: "bold"
	},
	buttonTextInActive: {
		color: colors.inactive,
	},
	// trackInfo: {
	// 	padding: 40,
	// 	backgroundColor: colors.inactive,
	// },
	// trackInfoText: {
	// 	textAlign: 'center',
	// 	flexWrap: 'wrap',
	// },
	// largeText: {
	// 	fontSize: 22
	// },
	// smallText: {
	// 	fontSize: 16
	// },
})

//export default AppSoundItem;