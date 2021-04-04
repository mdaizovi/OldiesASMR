import React, { useEffect, useState} from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, View, Image, Text,  Dimensions } from 'react-native'
import { List, ListItem } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Audio, Video } from 'expo-av'
import Slider from '@react-native-community/slider';
import {createStavkNavigator} from '@react-navigation/stack';
import {navigationContainer} from '@react-navigation/native';

import Screen from "../components/Screen";
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import AppSoundButton from "../components/AppSoundButton";
import colors from "../config/colors";
import playlistApi from '../api/playlist';

var deviceWidth = Dimensions.get('window').width; //full width



var tempPlaylist = [
	{
	citation: 'Hamlet - Act I',
	streaming_url:
	'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
	},
	{
	citation: 'Hamlet - Act II',
	streaming_url:
	'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
	},

]

var Soundlist = [
	{
		name: "you're at the beach",
		soundFile: require('../assets/audio/sounds/beach.mp3'),
	},
	{
		name: 'birds are chirping',
		soundFile: require('../assets/audio/sounds/birds.mp3'),
	},
	{
		name: "you're on a boat",
		soundFile: require('../assets/audio/sounds/boat.mp3'),
	},
	{
		name: "you're camping",
		soundFile: require('../assets/audio/sounds/camping.mp3'),
	},	
	{
		name: 'a cat is purring',
		soundFile: require('../assets/audio/sounds/cat.mp3'),
	},
	{	
		name: 'a clock is ticking',
		soundFile: require('../assets/audio/sounds/clock.mp3'),
	},
	{
		name: "there are crickets",
		soundFile: require('../assets/audio/sounds/crickets.mp3'),
	},
	{
		name: "you're on a farm",
		soundFile: require('../assets/audio/sounds/farm.mp3'),
	},		
	{
		name: "you're in a field",
		soundFile: require('../assets/audio/sounds/field.mp3'),
	},
	{
		name: "there's a fire",
		soundFile: require('../assets/audio/sounds/fire.mp3'),
	},		
	{
		name: "there are frogs",
		soundFile: require('../assets/audio/sounds/frogs.mp3'),
	},	
	{	
		name: 'a hammock is swinging',
		soundFile: require('../assets/audio/sounds/hammock.mp3'),
	},
	{	
		name: "you're at a lake",
		soundFile: require('../assets/audio/sounds/lake.mp3'),
	},
	{	
		name: "it's raining with thunder",
		soundFile: require('../assets/audio/sounds/rainWithThunder.mp3'),
	},
	{	
		name: "it's raining and windy",
		soundFile: require('../assets/audio/sounds/rainWind.mp3'),
	},
	{	
		name: 'a vinyl record is playing',
		soundFile: require('../assets/audio/sounds/vinyl.mp3'),
	},
	{	
		name: "roller skates are sliding on a rail",
		soundFile: require('../assets/audio/sounds/slidingRail.mp3'),
	},
	{	
		name: "you're skating over bricks",
		soundFile: require('../assets/audio/sounds/skateBricks.mp3'),
	},
	{	
		name: "you're skating in a concrete bowl",
		soundFile: require('../assets/audio/sounds/skatingConcreteBowl.mp3'),
	},
	{	
		name: "you're skating a wooden halfpipe",
		soundFile: require('../assets/audio/sounds/skateHalfpipeWood.mp3'),
	},
	{	
		name: "people are skateboarding at a park",
		soundFile: require('../assets/audio/sounds/skateboard.mp3'),
	},
	{	
		name: "people are skateboarding in a garage",
		soundFile: require('../assets/audio/sounds/skateboardICC.mp3'),
	},
	{	
		name: "you're on a train",
		soundFile: require('../assets/audio/sounds/train.mp3'),
	},
	{	
		name: 'water is flowing',
		soundFile: require('../assets/audio/sounds/water.mp3'),
	},
	{	
		name: 'waves are crashing',
		soundFile: require('../assets/audio/sounds/waves.mp3'),
	},
	{	
		name: 'wheels are rolling',
		soundFile: require('../assets/audio/sounds/wheels.mp3'),
	},
]
for (var i = 0; i < Soundlist.length; i++) {
	var sound = Soundlist[i];
	sound.soundObject = new Audio.Sound();
	sound.state = {isLoaded: false, isPlaying: false, volume: 0.25};
}

export default class MainScreen extends React.Component {

	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 0.75,
		isBuffering: false,
		masterPlaylist:[]
	}


	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})

			this.loadAudio()
		} catch (e) {
			console.log(e)
		}
	}


	async loadAudio() {
		const { masterPlaylist, playbackInstance, isPlaying, volume } = this.state
		var currentIndex = this.state.currentIndex
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			var nextIndex = this.state.currentIndex + 1
			currentIndex = nextIndex
		}

		if (masterPlaylist === undefined || masterPlaylist.length == 0) {
			console.log(tempPlaylist)

			// var playlist = this.loadPlaylist().then(function (res) {
			// 	console.log(playlist);  
			//   });
			var playlist = await this.loadPlaylist()
				console.log(playlist);  




			console.log("playlist in if statement")
			console.log(playlist)
		} else {
			var playlist = masterPlaylist
		}

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: playlist[currentIndex].streaming_url
			  }
			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)

			
			this.setState({
				currentIndex,
				playbackInstance
			})
		} catch (e) {
			console.log(e)
		}
	}

	  onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
		didJustFinish = status.didJustFinish
		if (didJustFinish) {
			this.loadAudio()
		  }
	}



	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})

	}

	handleNextTrack = async () => {
		this.loadAudio()
	}


	// handleNextTrack = async () => {
	// 	let { playbackInstance, currentIndex } = this.state
	// 	if (playbackInstance) {
	// 	  await playbackInstance.unloadAsync()
	// 	  currentIndex < playlist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
	// 	  this.setState({
	// 		currentIndex
	// 	  })
	// 	  this.loadAudio()
	// 	}
	//   }



	handlePlaySound = async arrayObj => {
		const soundObject = arrayObj.soundObject

		try {
			var soundState = arrayObj.state
			if (soundState.isLoaded === false) {
				await soundObject.loadAsync(arrayObj.soundFile)
				.catch(error => {
					console.log(error)
				})
				soundState.isLoaded = true;
				const initialVolume = soundState.volume;
				soundObject.setStatusAsync({ volume: initialVolume })
				this.setState({soundState})
			}
			if (soundState.isPlaying === true) {
				await soundObject.pauseAsync()
				.catch(error => {
					console.log(error)
				})
				soundState.isPlaying = false;
				this.setState({soundState})
			}  else {
				soundObject.setIsLoopingAsync(true)
				await soundObject.playAsync()
				.catch(error => {
					console.log(error)
			})
			soundState.isPlaying = true;
			this.setState({soundState})
		   }
		} catch (error) {
			console.log(error)
		}
	}

	handleSlide = async (arrayObj , value) => {
		const soundObject = arrayObj.soundObject
		var soundState = arrayObj.state
		const currentVolume = soundState.volume;
		soundState.volume = value;
		this.setState({soundState})
		if (soundState.isLoaded === true) {
			soundObject.setStatusAsync({ volume: value })
		}
	}

	handleSongVolume = async (value) => {
		const { isPlaying, playbackInstance } = this.state
		this.setState({
			volume: value
		})
		if (playbackInstance != null) {
			playbackInstance.setStatusAsync({ volume: value })
		}
	}

	loadPlaylist = async () => {
		var playlist = tempPlaylist
		//TODO replace with getting real playlist
		this.setState({
			masterPlaylist: tempPlaylist
		})
		return await playlist;
	}

	render() {


// https://stackoverflow.com/questions/56663785/invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of-a-function-com
		// const Playlist = () => {
		// 	const [playlist, setPlayList] = useState([]);
		
		// 	useEffect(() => {
		// 	fetch("https://www.oldiesinanotherroom.com/api/music_library/playlist")
		// 		.then(data => {
		// 			console.log(data)
		// 		return data.json();
		// 		})
		// 		.then(data => {
		// 			setPlaylist(data);
		// 		})
		// 		.catch(err => {
		// 		console.log(123123);
		// 		});
		// 	}, []);
		// }
		// Playlist();

		// Code ith mosh, but doesn't work
		// Error: Invalid hook call. Hooks can only be called inside of the body of a function component
		//
		// const [playlist, setPlaylist] = useState([]);
		// useEffect(() => {
		// loadPlaylist();
		// }, []);
		// const loadPlaylist = async () => {
		// 	//const response = await apiClient.getPlaylist();
		// 	const response = get("https://www.oldiesinanotherroom.com/api/music_library/playlist")
		// 	console.log(response.data);
		// 	setPlaylist(response.data);
		// }



		// useEffect(() => {
		// 	fetch('https://www.oldiesinanotherroom.com/api/music_library/playlist')
		// 	  .then((response) => response.json())
		// 	  .then((json) => setPlaylist(json))
		// 	  .catch((error) => console.error(error))
		// 	  .finally(() => setLoading(false));
		//   }, []);

		//const [masterPlaylist, setMasterPlaylist] = useState([]);
		//setMasterPlaylist(tempPlaylist);


		return (	
			<Screen style={styles.container}>
				{this.state.isPlaying ? (
				<Video
					source={require('../assets/video/RecordLoop.mp4')}
					resizeMode="cover"
					shouldPlay
					isLooping
					style={styles.recordBackground}
				/>
						) : (
				<Image
				style={styles.recordBackground}
				source={require('../assets/images/record.jpg') }
					/>
				)}

				<View style={styles.controls}>
								{/* prob the answer to my blinking problem
					https://stackoverflow.com/a/42348010 
					or this
					https://stackoverflow.com/a/56883227
					*/}
					<AppPlayPauseButton onPress={this.handlePlayPause} isPlaying={this.state.isPlaying}/>

					{this.state.isPlaying ? (
								<Slider
									style={[styles.volumeSlider, styles.songVolumeSlider]}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryLightGrey}
									maximumTrackTintColor={colors.active}
									thumbTintColor={colors.active}
									value={this.state.volume}
									onValueChange={value => this.handleSongVolume(value)}
								/>
							) : (
								<Slider
									style={[styles.volumeSlider,styles.songVolumeSlider]}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryDarkGrey}
									maximumTrackTintColor={colors.inactive}
									thumbTintColor={colors.inactive}
									value={this.state.volume}
									onValueChange={value => this.handleSongVolume(value)}
							/>
							)}

					<AppPlayerButton iconName="navigate-next" onPress={this.handleNextTrack}/>	
				</View>

				<View style={styles.separator}>
        		</View>

				<View style={{flex:1}}>
  				<ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:100}}>
				{Soundlist.map((soundInfo) => {
					return (
						<View key={soundInfo.name} style={styles.soundContainer}>
							<AppSoundButton name={soundInfo.name} isPlaying={soundInfo.state.isPlaying} onPress={() => this.handlePlaySound(soundInfo)}/>
							
							{soundInfo.state.isPlaying ? (
								<Slider
									style={styles.volumeSlider}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryLightGrey}
									maximumTrackTintColor={colors.active}
									thumbTintColor={colors.active}
									value={soundInfo.state.volume}
									onValueChange={value => this.handleSlide(soundInfo, value)}
								/>
							) : (
								<Slider
									style={styles.volumeSlider}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryDarkGrey}
									maximumTrackTintColor={colors.inactive}
									thumbTintColor={colors.inactive}
									value={soundInfo.state.volume}
									onValueChange={value => this.handleSlide(soundInfo, value)}
							/>
							)}

						</View>
					);
				})}
			</ScrollView>
			</View>
			</Screen>

		)
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
		//justifyContent: 'center'
	},
  	recordBackground: {
		width:deviceWidth,
		height:deviceWidth / 1.7778 // ratio of record image.
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	},
	soundContainer: {
		height: 100,
		width:deviceWidth,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.blue
	},
	separator: {
		height: 1,
		width: "80%",
		backgroundColor: colors.veryLightGrey
	},
	volumeSlider: {
		width: 200, 
		height: 40
	},
	songVolumeSlider: {
		marginTop: 25, 
	},
})