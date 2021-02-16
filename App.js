import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Audio, Video } from 'expo-av'
//import { Playlist } from "./app/data/Playlist";
//const Playlist = require('./app/data//Playlist.json');
//import AppMusicPlayer from "./app/components/AppMusicPlayer";
import AppPlayerButton from "./app/components/AppPlayerButton";
import AppSoundButton from "./app/components/AppSoundButton";


const Playlist = [
	{
		title: 'Oldies',
		source: 'Free Sound Archive',
    musicFile: require('./app/assets/audio/music/1000/afghanis_64kb.mp3'),
    musicPath: './app/assets/audio/music/1000/afghanis_64kb.mp3',
	},
	{
		title: 'Playing',
		source: 'Free Sound Archive',
    musicFile: require('./app/assets/audio/music/1000/bluerose_64kb.mp3'),
    musicPath: './app/assets/audio/music/1000/bluerose_64kb.mp3',
	},
	{
		title: 'In Another',
		source: 'Free Sound Archive',
    musicFile: require('./app/assets/audio/music/1000/Black_Devils-MonkymanREDO_11KHz_64kb.mp3'),
    musicPath: './app/assets/audio/music/1000/Black_Devils-MonkymanREDO_11KHz_64kb.mp3',
	},
	{
		title: 'Room',
		source: 'Free Sound Archive',
    musicFile: require('./app/assets/audio/music/1000/Whiteman-Whispering_11KHz_64kb.mp3'),
    musicPath: './app/assets/audio/music/1000/Whiteman-Whispering_11KHz_64kb.mp3',
	},
]

const noiseSounds = {
	cat: require('./app/assets/audio/sounds/cat.mp3'),
	clock: require('./app/assets/audio/sounds/clock.mp3'),
}

export default class App extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
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
      // I do not understan why these don't work.

      //const songPath = Playlist[currentIndex].musicPath
      //const source = require(songPath)
      
      //const source = require(Playlist[currentIndex].musicPath)
      //const source = Playlist[currentIndex].musicPath

      // why does this work?!? looks same as others to me.
      //const source = require('./app/assets/audio/music/1000/Whiteman-Whispering_11KHz_64kb.mp3')
      const source = Playlist[currentIndex].musicFile

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
      // accidentally got me simultaneous audio. Good to know
      //let source = require('./app/assets/audio/music/1000/afghanis_64kb.mp3')
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

	handlePreviousTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < Playlist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < Playlist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	renderFileInfo() {
		const { playbackInstance, currentIndex } = this.state
		return playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{Playlist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{Playlist[currentIndex].source}
				</Text>
			</View>
		) : null
	}

	handlePlaySound = async note => {
		const soundObject = new Audio.Sound()

		try {
			let source = noiseSounds[note]
			await soundObject.loadAsync(source)
			await soundObject
				.playAsync()
				.then(async playbackStatus => {
					setTimeout(() => {
						soundObject.unloadAsync()
					}, playbackStatus.playableDurationMillis)
				})
				.catch(error => {
					console.log(error)
				})
		} catch (error) {
			console.log(error)
		}
	}


	render() {
		return (
			<View style={styles.container}>
       		{this.renderFileInfo()}
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
					
			<AppPlayerButton iconName="navigate-before" onPress={this.handlePreviousTrack}/>
						{/* prob the answer to my blinking problem
			https://stackoverflow.com/a/42348010 
			or this
			https://stackoverflow.com/a/56883227
			*/}
			<TouchableOpacity style={styles.control}  onPress={this.handlePlayPause}>
							{this.state.isPlaying ? (
								<Ionicons name='ios-pause' size={48} color='#444' />
							) : (
								<Ionicons name='ios-play-circle' size={48} color='#444' />
							)}
						</TouchableOpacity>
						
			<AppPlayerButton iconName="navigate-next" onPress={this.handleNextTrack}/>
				
        	</View>
				<View style={styles.buttonContainer}>
					<AppSoundButton name="cat" onPress={() => this.handlePlaySound('cat')}/>
				</View>
				<View style={styles.buttonContainer}>
				<AppSoundButton name="clock" onPress={() => this.handlePlaySound('clock')}/>
				</View>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
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
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
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
		backgroundColor: 'red'
	},
	buttonText: {
		color: '#fff',
		fontSize: 18
	}
})