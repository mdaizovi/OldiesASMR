import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Audio } from 'expo-av'

const audioBookPlaylist = [
	{
		title: 'Hamlet - Act I',
		author: 'William Shakespeare',
		source: 'Free Sound Archive',
    musicFile: require('./assets/audio/music/1000/afghanis_64kb.mp3'),
    imageFile: require('./assets/images/record_columbia.jpg')
	},
	{
		title: 'Hamlet - Act II',
		author: 'William Shakespeare',
		source: 'Free Sound Archive',
    musicFile: require('./assets/audio/music/1000/bluerose_64kb.mp3'),
    imageFile: require('./assets/images/victrola_color.jpg')
	},
	{
		title: 'Hamlet - Act III',
		author: 'William Shakespeare',
		source: 'Free Sound Archive',
    musicFile: require('./assets/audio/music/1000/Black_Devils-MonkymanREDO_11KHz_64kb.mp3'),
    imageFile: require('./assets/images/victrola_columbia.jpg')
	},
	{
		title: 'Hamlet - Act III',
		author: 'William Shakespeare',
		source: 'Free Sound Archive',
    musicFile: require('./assets/audio/music/1000/Whiteman-Whispering_11KHz_64kb.mp3'),
    imageFile: require('./assets/images/vinyl.jpg')
	}
]

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
			const source = audioBookPlaylist[currentIndex].musicFile

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
      // accidentally got me simultaneous audio. Good to know
      //let source = require('./assets/audio/music/1000/afghanis_64kb.mp3')
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
			currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
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
			currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
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
					{audioBookPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].author}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].source}
				</Text>
			</View>
		) : null
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.albumCover}
					source={require('./assets/images/victrola_columbia.jpg') }
				/>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
            <MaterialIcons name="navigate-before" size={48} color="#444" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
						{this.state.isPlaying ? (
							<Ionicons name='ios-pause' size={48} color='#444' />
						) : (
							<Ionicons name='ios-play-circle' size={48} color='#444' />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
            <MaterialIcons name="navigate-next" size={48} color="#444" />
					</TouchableOpacity>
				</View>
				{this.renderFileInfo()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: 250,
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
	}
})