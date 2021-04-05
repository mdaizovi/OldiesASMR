import React from 'react'
import { StyleSheet, View, Image,  Dimensions } from 'react-native'
import { Audio, Video } from 'expo-av'
import Slider from '@react-native-community/slider';
import Screen from "../components/Screen";
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import AppSoundComponent from "../components/AppSoundComponent";
import colors from "../config/colors";

var deviceWidth = Dimensions.get('window').width; //full width

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
				playInBackground:true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})
			await this.loadPlaylist()
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
			var playlist = await this.loadPlaylist() 
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
		if (!playbackInstance) {
			await this.loadAudio()
		}
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})

	}

	handleNextTrack = async () => {
		let { masterPlaylist, playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
		  await playbackInstance.unloadAsync()
		}
		if (currentIndex === masterPlaylist.length - 1) {
			//start over if currently on the last track of playlist
			var playlist = await this.loadPlaylist()
			this.setState({
				currentIndex: -1,
				masterPlaylist: playlist
			})
		} 
		this.loadAudio()
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
		try {
			let response = await fetch(
			'https://www.oldiesinanotherroom.com/api/music_library/playlist'
			);
			let json = await response.json();
			this.setState({
			loading: false,
			masterPlaylist: json
			})
			return await json;
		} catch (error) {
			console.error(error);
		}
	}

	render() {

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

				<AppSoundComponent/>
 
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
	controls: {
		flexDirection: 'row'
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
})