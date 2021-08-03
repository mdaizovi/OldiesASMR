import React from 'react'
import { StyleSheet, ActivityIndicator, Button, Text, View, Image,  Dimensions } from 'react-native'
import { Audio, Video } from 'expo-av'
import Slider from '@react-native-community/slider';
import Screen from "../components/Screen";
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import AppSoundComponent from "../components/AppSoundComponent";
import colors from "../config/colors";
import settings from "../config/settings";
import TextTicker from 'react-native-text-ticker'
import logger from '../utilities/logger';  
import playbackInstanceContext from '../context/context';


var deviceWidth = Dimensions.get('window').width; //full width

export default class MainScreen extends React.Component {
	state = {
		songIsPlaying: false,
		songisLoading:true,
		songplaybackInstance: null,

		currentIndex: 0,
		volume: 0.75,
		isBuffering: false,
		masterPlaylist:null,
		playListFetchError:null
	}
	static contextType = playbackInstanceContext;

	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				staysActiveInBackground: true,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				shouldDuckAndroid: true,
				playInBackground:true,
				playThroughEarpieceAndroid: true
			})
			var playlist = await this.loadPlaylist()
			if ( playlist.length > 0) {
				await this.loadAudio()
			} 
		} catch (e) {
		}
	}


	async loadAudio() {
		const { masterPlaylist, songplaybackInstance, songIsPlaying, volume } = this.state
		var currentIndex = this.state.currentIndex

		var playbackInstances = this.context.playbackInstances
		var addNewPlaybackInstance = this.context.addNewPlaybackInstance

		if (songplaybackInstance) {
			await songplaybackInstance.unloadAsync()
			var nextIndex = this.state.currentIndex + 1
			currentIndex = nextIndex
		}
		if (masterPlaylist === null) {
			var playlist = await this.loadPlaylist() 
		} else {
			var playlist = masterPlaylist 
		}

		const {playListFetchError} = this.state
		if (playListFetchError === false && playlist.length > 0) {
			try {
				const songplaybackInstance = new Audio.Sound()
				const source = {
					uri: playlist[currentIndex].streaming_url
				  }
				const status = {
					shouldPlay: songIsPlaying,
					volume: volume
				}
	
				songplaybackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
				await songplaybackInstance.loadAsync(source, status, false)
				await addNewPlaybackInstance("song", songplaybackInstance)
				this.setState({
					currentIndex,
					songplaybackInstance
				})
			} catch (e) {
			}
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
		let { songIsPlaying, songplaybackInstance } = this.state
		songIsPlaying ? await songplaybackInstance.pauseAsync() : await songplaybackInstance.playAsync()
		this.setState({
			songIsPlaying: !songIsPlaying
		})

	}

	handleNextTrack = async () => {
		let { masterPlaylist, songplaybackInstance, currentIndex } = this.state

		let song_id = masterPlaylist[currentIndex].id;
		//await this.noteSkippedSong(song_id); 
		this.noteSkippedSong(song_id);  // do i need to await ?

		if (songplaybackInstance) {
		    var removePlaybackInstance = this.context.removePlaybackInstance
			removePlaybackInstance("song",songplaybackInstance)
		    await songplaybackInstance.unloadAsync()
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
		const { songIsPlaying, songplaybackInstance } = this.state
		this.setState({
			volume: value
		})
		if (songplaybackInstance != null) {
			songplaybackInstance.setStatusAsync({ volume: value })
		}
	}

	loadPlaylist = async () => {
		try {
			let response = await fetch(
				settings.apiUrl
			);
			if (response.status===200) {
				let json = await response.json();
				this.setState({
					songisLoading: false,
					masterPlaylist: json,
					playListFetchError: false
				})
				return await json;
			} else {
				this.setState({
					playListFetchError: true,
					songisLoading: false,
				})
				return [];
			}
			
		} catch (error) {
			this.setState({
				playListFetchError: true
				})
			logger.log(error);
			return [];
		}
	}
	
	noteSkippedSong = async (song_id) => {
		/// Tells BE this song was skipped so we can know which songs everyone hates 

		fetch(settings.skipUrl, {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  song: song_id,
			})
		  });

	}

	render() {

		return (	
			<Screen style={styles.container}>
			{this.state.songisLoading ? (
				<ActivityIndicator animating={this.state.songisLoading} size="large"/>
			) : (
				<>
				{this.state.playListFetchError ? (
					<>
					<Text style={[styles.errorInfo]}>Couldn't load song playlist. Are you sure you're connected to the internet?</Text>
					<Button title="Retry" onPress={this.loadPlaylist}/>
					</>
					) : (
						<>
						{this.state.songIsPlaying ? (
							<>
							<Video
								source={require('../assets/video/RecordLoop.mp4')}
								resizeMode="cover"
								shouldPlay
								isLooping
								style={styles.recordBackground}
							/>
							<TextTicker
								style={[styles.trackInfo, styles.trackInfoText]}
								duration={20000}
								loop
							>
							{this.state.masterPlaylist[this.state.currentIndex].citation_mla}
							</TextTicker>
							</>
									) : (
										<>
							<Image
							style={styles.recordBackground}
							source={require('../assets/images/record.jpg') }
								/>
								<Text style={[styles.trackInfo, styles.trackInfoText]}>
									{this.state.masterPlaylist[this.state.currentIndex].citation_mla}
								</Text>
								</>
							)}

			
							<View style={styles.controls}>
											{/* prob the answer to my blinking problem
								https://stackoverflow.com/a/42348010 
								or this
								https://stackoverflow.com/a/56883227
								*/}
						
								{this.state.songplaybackInstance  ? (
									<AppPlayPauseButton onPress={this.handlePlayPause} songIsPlaying={this.state.songIsPlaying}/>
									) : (
									<ActivityIndicator animating={!this.state.songplaybackInstance} color={colors.white} size="large"/>
									)}
			
								{this.state.songIsPlaying ? (
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
							</>
				)}
 			<AppSoundComponent/>
			</>
			)}
			</Screen>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.darkGrey,
		alignItems: 'center',
    	paddingTop:0,
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
	songVolumeSlider: {
		marginTop:25
	},
	trackInfo: {
		//padding: 10,
		margin: 5,
		height: 15,
		top:5
	},
	trackInfoText: {
		fontStyle: 'italic',
		fontSize: 16,
		color: colors.veryDarkGrey,
	},
	errorInfo: {
		fontSize: 25,
		margin: 20,
		height: 150,
		textAlign: 'center',
		flexWrap: 'wrap',
		color: colors.veryLightGrey,
	},
	smallText: {
		//margin: 20,
		fontSize: 16,
		color: colors.veryLightGrey,
		flexWrap: 'wrap'
	},
})