import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, View, Image, Text } from 'react-native'
import { List, ListItem } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Audio, Video } from 'expo-av'
import Slider from '@react-native-community/slider';

//import { Playlist } from "./app/data/Playlist";
//const Playlist = require('./app/data/Playlist.json');
//import AppMusicPlayer from "./app/components/AppMusicPlayer";
import AppPlayerButton from "./app/components/AppPlayerButton";
import AppPlayPauseButton from "./app/components/AppPlayPauseButton";
import AppSoundButton from "./app/components/AppSoundButton";
import colors from "./app/config/colors";


const Playlist = [
	{
    	musicFile: require('./app/assets/audio/music/1000/afghanis_64kb.mp3'),
	},
	{
    	musicFile: require('./app/assets/audio/music/1000/bluerose_64kb.mp3'),
	},
	{
    	musicFile: require('./app/assets/audio/music/1000/Black_Devils-MonkymanREDO_11KHz_64kb.mp3'),
	},
	{
    	musicFile: require('./app/assets/audio/music/1000/Whiteman-Whispering_11KHz_64kb.mp3'),
	},
]

var Soundlist = [
	{
		name: "you're at the beach",
		soundFile: require('./app/assets/audio/sounds/beach.mp3'),
	},
	{
		name: 'birds are chirping',
		soundFile: require('./app/assets/audio/sounds/birds.mp3'),
	},
	{
		name: "you're on a boat",
		soundFile: require('./app/assets/audio/sounds/boat.mp3'),
	},
	{
		name: "you're camping",
		soundFile: require('./app/assets/audio/sounds/camping.mp3'),
	},	
	{
		name: 'a cat is purring',
		soundFile: require('./app/assets/audio/sounds/cat.mp3'),
	},
	{	
		name: 'a clock is ticking',
		soundFile: require('./app/assets/audio/sounds/clock.mp3'),
	},
	{
		name: "there are crickets",
		soundFile: require('./app/assets/audio/sounds/crickets.mp3'),
	},
	{
		name: "you're on a farm",
		soundFile: require('./app/assets/audio/sounds/farm.mp3'),
	},		
	{
		name: "you're in a field",
		soundFile: require('./app/assets/audio/sounds/field.mp3'),
	},
	{
		name: "there's a fire",
		soundFile: require('./app/assets/audio/sounds/fire.mp3'),
	},		
	{
		name: "there are frogs",
		soundFile: require('./app/assets/audio/sounds/frogs.mp3'),
	},	
	{	
		name: 'a hammock is swinging',
		soundFile: require('./app/assets/audio/sounds/hammock.mp3'),
	},
	{	
		name: "you're at a lake",
		soundFile: require('./app/assets/audio/sounds/lake.mp3'),
	},
	{	
		name: "it's raining with thunder",
		soundFile: require('./app/assets/audio/sounds/rainWithThunder.mp3'),
	},
	{	
		name: "it's raining and windy",
		soundFile: require('./app/assets/audio/sounds/rainWind.mp3'),
	},
	{	
		name: 'a vinyl record is playing',
		soundFile: require('./app/assets/audio/sounds/vinyl.mp3'),
	},
	{	
		name: "you're roller skating outside over bricks",
		soundFile: require('./app/assets/audio/sounds/skateBricks.mp3'),
	},
	{	
		name: "people are skateboarding",
		soundFile: require('./app/assets/audio/sounds/skateboard.mp3'),
	},
	{	
		name: "you're on a train",
		soundFile: require('./app/assets/audio/sounds/train.mp3'),
	},
	{	
		name: 'water is flowing',
		soundFile: require('./app/assets/audio/sounds/water.mp3'),
	},
	{	
		name: 'waves are crashing',
		soundFile: require('./app/assets/audio/sounds/waves.mp3'),
	},
	{	
		name: 'wheels are rolling',
		soundFile: require('./app/assets/audio/sounds/wheels.mp3'),
	},
]
for (var i = 0; i < Soundlist.length; i++) {
	var sound = Soundlist[i];
	sound.soundObject = new Audio.Sound();
	sound.state = {isLoaded: false, isPlaying: false, volume: 0.5};
}

var startingTracksUnPlayed =  Array.from({length: Playlist.length}, (_, index) => index);
var startingRandomIndex = Math.floor(Math.random() * Playlist.length);
startingTracksUnPlayed.splice(startingRandomIndex, 1);

export default class App extends React.Component {

	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: startingRandomIndex,
		nextIndex: null, // will be replaced.
		volume: 0.5,
		isBuffering: true,
		tracksUnPlayed :  startingTracksUnPlayed,
		tracksPlayed : [startingRandomIndex]
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
		const { playbackInstance, isPlaying, volume } = this.state
		var currentIndex = this.state.currentIndex
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.chooseNextTrack()
			var nextIndex = this.state.nextIndex
			currentIndex = nextIndex
		}

		try {
			const playbackInstance = new Audio.Sound()
			const source = Playlist[currentIndex].musicFile
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

	chooseNextTrack = () => {
		var tracksUnPlayed = this.state.tracksUnPlayed
		var tracksPlayed = this.state.tracksPlayed
		var nextIndex = this.state.nextIndex

		if (tracksUnPlayed.length === 0) {
			// start over
			// but first make sure next track is from first 25% of songs played
			quarterLen = Math.floor(tracksPlayed.length / 4)
			firstQuartile = tracksPlayed.slice(0, quarterLen)
			var randomUnPlayedIndex = firstQuartile[Math.floor(Math.random() * firstQuartile.length)];
			// okay now really start over.
			tracksUnPlayed = Array.from({length: Playlist.length}, (_, index) => index),
			tracksPlayed = []
		} else {
			var randomUnPlayedIndex = tracksUnPlayed[Math.floor(Math.random() * tracksUnPlayed.length)];
		}
		tracksPlayed.push(randomUnPlayedIndex);
		const removeIndex = tracksUnPlayed.indexOf(randomUnPlayedIndex);
		tracksUnPlayed.splice(removeIndex, 1);
		nextIndex = randomUnPlayedIndex;
		this.setState({
			nextIndex,
			tracksPlayed,
			tracksUnPlayed
		})


	}

	handleNextTrack = async () => {
		this.loadAudio()
	}

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
		const { playbackInstance } = this.state
		this.setState({
			volume: value
		})
		playbackInstance.setStatusAsync({ volume: value })
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.isPlaying ? (
				<Video
					source={require('./app/assets/video/RecordLoop.mp4')}
					resizeMode="cover"
					shouldPlay
					isLooping
					style={styles.recordBackground}
				/>
						) : (
				<Image
				style={styles.recordBackground}
				source={require('./app/assets/images/record.jpg') }
					/>
				)}

				<View style={styles.controls}>
								{/* prob the answer to my blinking problem
					https://stackoverflow.com/a/42348010 
					or this
					https://stackoverflow.com/a/56883227
					*/}
					<AppPlayPauseButton onPress={this.handlePlayPause} isPlaying={this.state.isPlaying}/>

					<Slider
						style={{width: 200, height: 40}}
						minimumValue={0}
						maximumValue={1}
						minimumTrackTintColor="red"
						maximumTrackTintColor="#000000"
						value={this.state.volume}
						onValueChange={value => this.handleSongVolume(value)}
					/>

					<AppPlayerButton iconName="navigate-next" onPress={this.handleNextTrack}/>	
				</View>

				<View style={styles.separator}>
        		</View>

				<View style={{flex:1}}>
  				<ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:100}}>
				{Soundlist.map((soundInfo) => {
					return (
						<View key={soundInfo.name} style={styles.soundContainer}>
							<AppSoundButton name={soundInfo.name} onPress={() => this.handlePlaySound(soundInfo)}/>
							<Slider
								style={{width: 200, height: 40}}
								minimumValue={0}
								maximumValue={1}
								minimumTrackTintColor="red"
								maximumTrackTintColor="#000000"
								value={soundInfo.state.volume}
								//onValueChange={val => this.setState({ volume: val })}
								//onValueChange={() => this.handleSlide(soundInfo)}
								onValueChange={value => this.handleSlide(soundInfo, value)}
							/>
						</View>
					);
				})}
			</ScrollView>
			</View>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: 'center',
    	top:50,
		//justifyContent: 'center'
	},
  	recordBackground: {
		width: 533,
		height: 250
	},
	trackInfo: {
		padding: 40,
		backgroundColor: colors.white,
	},
	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
	
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	},
	soundContainer: {
		height: 100,
		width:400,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.veryLightGrey,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.blue
	},
	buttonText: {
		color: colors.black,
		fontSize: 18
	},
	separator: {
		height: 1,
		width: "86%",
		backgroundColor: "#CED0CE",
		marginLeft: "14%"
	}
})