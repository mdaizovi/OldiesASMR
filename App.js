import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Audio, Video } from 'expo-av'
//import { Playlist } from "./app/data/Playlist";
//const Playlist = require('./app/data//Playlist.json');
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


const Soundlist = [
	{
		key: 'cat',
		name: 'Cat Purring',
		soundFile: require('./app/assets/audio/sounds/cat.mp3'),
		soundPath: './app/assets/audio/sounds/cat.mp3',
		soundObject: new Audio.Sound(),
		state: {isLoaded: false, isPlaying: false, volume: 1.0}
	},
	{	
		key:'clock',
		name: 'Clock Ticking',
		soundFile: require('./app/assets/audio/sounds/clock.mp3'),
		soundPath: './app/assets/audio/sounds/clock.mp3',
		soundObject: new Audio.Sound(),
		state: {isLoaded: false, isPlaying: false, volume: 1.0}
	},
]


export default class App extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true,
		tracksUnPlayed : Array.from({length: Playlist.length}, (_, index) => index),
		tracksPlayed : [],
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
		const { currentIndex, isPlaying, volume } = this.state

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
	}

	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()

			var tracksUnPlayed = this.state.tracksUnPlayed
			var tracksPlayed = this.state.tracksPlayed
			console.log(".")
			console.log("------start")
			console.log("tracksUnPlayed:")
			console.log(tracksUnPlayed)

			if (tracksUnPlayed.length === 0) {
				// start over
				tracksUnPlayed = Array.from({length: Playlist.length}, (_, index) => index),
				tracksPlayed = []
				console.log("tracksUnPlayed after reset (should be all):")
				console.log(tracksUnPlayed)
				console.log("tracksPlayed after reset (should be none):")
				console.log(tracksPlayed)
			}
			const randomUnPlayedIndex = tracksUnPlayed[Math.floor(Math.random() * tracksUnPlayed.length)];
			const randomIndex = randomUnPlayedIndex
			console.log("randomIndex ")
			console.log(randomIndex)

			tracksPlayed.push(randomIndex);
			const removeIndex = tracksUnPlayed.indexOf(randomIndex);
			tracksUnPlayed.splice(removeIndex, 1);
			
			console.log("tracksUnPlayed, randomIndex should be removed")
			console.log(tracksUnPlayed)
			console.log("tracksPlayed, randomIndex should be added")
			console.log(tracksPlayed)

			currentIndex = randomIndex;
			console.log("------end")
			console.log(".")
			this.setState({
				currentIndex,
				tracksPlayed,
				tracksUnPlayed
			})
			this.loadAudio()
		}
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

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.controls}>
								{/* prob the answer to my blinking problem
					https://stackoverflow.com/a/42348010 
					or this
					https://stackoverflow.com/a/56883227
					*/}
					<AppPlayPauseButton onPress={this.handlePlayPause} isPlaying={this.state.isPlaying}/>
					<AppPlayerButton iconName="navigate-next" onPress={this.handleNextTrack}/>	
				</View>

				<Text style={styles.buttonText}>{this.state.currentIndex}</Text>
				
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

				{Soundlist.map((soundInfo) => {
					return (
						<View key={soundInfo.key} style={styles.buttonContainer}>
							<AppSoundButton name={soundInfo.name} onPress={() => this.handlePlaySound(soundInfo)}/>
						</View>
					);
				})}
			
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: 'center',
    	top:20,
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
		color: colors.purple
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
	buttonContainer: {
		height: 40,
		margin: 5
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
	}
})