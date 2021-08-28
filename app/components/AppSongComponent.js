import React, { useState } from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import { StyleSheet, ActivityIndicator, Button, Text, View, Image,  Dimensions } from 'react-native'
import Slider from '@react-native-community/slider';
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import colors from "../config/colors";

var deviceWidth = Dimensions.get('window').width; //full width

function AppSongComponent({masterPlaylist}) {

	//const {songListFetching, songList, songListFetchError} = useSelector(state => state.songListReducer);

	const [songIsPlaying, setsongIsPlaying] = React.useState(false);
	const [songPlaybackInstance, setsongPlaybackInstance] = React.useState(null);
	const [currentIndex, setcurrentIndex] = React.useState(0);
	const [volume, setvolume] = React.useState(0.75);
	const [isBuffering, setisBuffering] = React.useState(false);


	  onPlaybackStatusUpdate = status => {
		let { songPlaybackInstance, songIsPlaying} = this.state

		this.setState({
			isBuffering: status.isBuffering
		})
		didJustFinish = status.didJustFinish
		
		// // in case of sleep timer or stop button
		// if (audioHasBeenStopped === true && songIsPlaying === true) {
		// 	console.log("audio should not play and song is playing");
		// 	songPlaybackInstance.pauseAsync()
		// 	this.setState({
		// 		songIsPlaying: false,
		// 	})
		// }
		if (didJustFinish) {
			loadAudio()
		  }
	}

	const loadAudio = async () => {
		console.log("loadAudio");
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

	handlePlayPause = async () => {
		console.log("handlePlayPause");
		let { songIsPlaying, songPlaybackInstance} = this.state
		if (songPlaybackInstance===null) {
			console.log("songPlaybackInstance is null");
		    await loadAudio()
			console.log("think this wont run");
		}
		console.log("this wont run either");
		songIsPlaying ? await songPlaybackInstance.pauseAsync() : await songPlaybackInstance.playAsync()
		this.setState({
			songIsPlaying: !songIsPlaying,
		})

	}

	handleNextTrack = async () => {
		let { masterPlaylist, songPlaybackInstance, currentIndex } = this.state

		let song_id = masterPlaylist[currentIndex].id;
		//await this.noteSkippedSong(song_id); 
		this.noteSkippedSong(song_id);  // do i need to await ?

		if (songPlaybackInstance) {
		    await songPlaybackInstance.unloadAsync()
		}

		if (currentIndex === masterPlaylist.length - 1) {
			//start over if currently on the last track of playlist
			var playlist = await this.loadPlaylist()
			this.setState({
				currentIndex: -1,
				masterPlaylist: playlist
			})
		} 
		loadAudio()
	  }

	handleSongVolume = async (value) => {
		const { songIsPlaying, songPlaybackInstance } = this.state
		this.setState({
			volume: value
		})
		if (songPlaybackInstance != null) {
			songPlaybackInstance.setStatusAsync({ volume: value })
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


	return (			
		<View>
			{songIsPlaying ? (
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
				{masterPlaylist[currentIndex].citation_mla}
				</TextTicker>
				</>
						) : (
							<>
				<Image
				style={styles.recordBackground}
				source={require('../assets/images/record.jpg') }
					/>
					<Text style={[styles.trackInfo, styles.trackInfoText]}>
						{masterPlaylist[currentIndex].citation_mla}
					</Text>
					</>
				)}


				<View style={styles.controls}>
								{/* prob the answer to my blinking problem
					https://stackoverflow.com/a/42348010 
					or this
					https://stackoverflow.com/a/56883227
					*/}
			
					{masterPlaylist ? (
						<AppPlayPauseButton onPress={handlePlayPause} songIsPlaying={songIsPlaying}/>
						) : (
						<ActivityIndicator animating={!songPlaybackInstance} color={colors.white} size="large"/>
						)}

					{songIsPlaying ? (
								<Slider
									style={[styles.volumeSlider, styles.songVolumeSlider]}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryLightGrey}
									maximumTrackTintColor={colors.active}
									thumbTintColor={colors.active}
									value={volume}
									onValueChange={value => handleSongVolume(value)}
								/>
							) : (
								<Slider
									style={[styles.volumeSlider,styles.songVolumeSlider]}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryDarkGrey}
									maximumTrackTintColor={colors.inactive}
									thumbTintColor={colors.inactive}
									value={volume}
									onValueChange={value => handleSongVolume(value)}
							/>
							)}
					<AppPlayerButton iconName="navigate-next" onPress={handleNextTrack}/>

				</View>

				<View style={styles.separator}>
				</View>

		</View>
	)
	}

export default AppSongComponent;

const styles = StyleSheet.create({
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
	}
})