import React, { useState } from 'react';
import { Audio, Video } from 'expo-av'
import {useSelector, useDispatch, connect} from 'react-redux';
import { StyleSheet, ActivityIndicator, Button, Text, View, Image, Dimensions } from 'react-native'
import Slider from '@react-native-community/slider';
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import colors from "../config/colors";
import TextTicker from 'react-native-text-ticker'

import {getSongList, changeSongVolume, playSong, pauseSong, loadSong, unloadSong} from '../redux/actions/actionsSongPlay';

var deviceWidth = Dimensions.get('window').width; //full width

export default function AppSongComponent() {

	const {songList, shouldPlay, songListFetchError, songIsPlaying, songPlaybackInstance, currentIndex, volume} = useSelector(state => state.songPlayReducer);
	const dispatch = useDispatch();
	const fetchSongList = () => dispatch(getSongList());
	const dispatchedChangeSongVolume = value => dispatch(changeSongVolume(value));
	const dispatchedPauseSong = songPlaybackInstance => dispatch(pauseSong(songPlaybackInstance));
	const dispatchedPlaySong = songPlaybackInstance => dispatch(playSong(songPlaybackInstance));
	const dispatchedloadSong = songPlaybackInstance => dispatch(loadSong(songPlaybackInstance));
	const dispatchedunloadSong = songPlaybackInstance => dispatch(unloadSong(songPlaybackInstance));
	const dispatchedChangeSongIndex = value => dispatch(changeSongIndex(value));
	
	//used to be async. should be again?
	handleSongVolume = async (value) => {
	//const handleSongVolume = value => {
		if (songPlaybackInstance != null) {  
		  songPlaybackInstance.setStatusAsync({ volume: action.payload })
		}
		dispatchedChangeSongVolume(value);
	};


	handlePlayPause = async () => {
		console.log("handlePlayPause");
		if (songPlaybackInstance===null) {
			console.log("no song instance")
			await loadAudio()
		} else if (songIsPlaying) {
			console.log("we have song instance and it's playing")
			dispatchedPauseSong(songPlaybackInstance);
		} else {
			// we have songPlaybackInstance but it's not playing
			console.log("we have song instance but it's paused")
			dispatchedPlaySong(songPlaybackInstance);
		}

	}

	handleNextSongIndex = async () => {
		console.log("handleNextSongIndex");
		if (currentIndex === songList.length - 1) {
			//start over if currently on the last track of playlist
			fetchSongList();
			dispatchedChangeSongindex(0);
		} else {
			dispatchedChangeSongindex(currentIndex + 1);
		}

	}

	handleNextTrack = async () => {
		console.log("handleNextTrack");
		//let song_id = songList[currentIndex].id;
		// 	//await this.noteSkippedSong(song_id); 
		// 	this.noteSkippedSong(song_id);  // do i need to await ?

		if (songPlaybackInstance) {
			console.log("unloading");
			// should prob have a song stopped dispatch? or no?
			await songPlaybackInstance.unloadAsync()
		}
		handleNextSongIndex()
		await loadAudio();
	}

	onPlaybackStatusUpdate = status => {
		didJustFinish = status.didJustFinish;
		// // in case of sleep timer or stop button
		// if (audioHasBeenStopped === true && songIsPlaying === true) {
		// 	console.log("audio should not play and song is playing");
		// 	songPlaybackInstance.pauseAsync()
		// 	this.setState({
		// 		songIsPlaying: false,
		// 	})
		// }
		if (didJustFinish) {
			console.log("song just finished")
		  	// play next song. increment index, unload old song, load new song.
			handleNextTrack()
		}
	  }

	loadAudio = async () => {
		console.log("loadAudio");
		// do these 2 ever run?
		if (songPlaybackInstance) {
			console.log("there is a track, unloading");
			dispatchedunloadSong(songPlaybackInstance);
			handleNextSongIndex();
		}
		if (songList === null) {
			console.log("no song list, getting it");
			await fetchSongList();
		}

		if (songListFetchError === false && songList.length > 0) {
			console.log("no playlist error and songs");
			try {
				const songPlaybackInstance = new Audio.Sound()
				const source = {
					uri: songList[currentIndex].streaming_url
				  }
				console.log("source: ",source);
				const status = {
					shouldPlay: songIsPlaying,
					volume: volume
				}
				songPlaybackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
				console.log("a");
				await songPlaybackInstance.loadAsync(source, status, false)
				console.log("b");
				dispatchedloadSong(songPlaybackInstance);
				console.log("c");
				handlePlayPause();
				console.log("c again");
			} catch (e) {
				console.log(e)
			}
		console.log("d");
		} else {
			console.log("playlist error or no songs");
		}
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
				{songList[currentIndex].citation_mla}
				</TextTicker>
				</>
						) : (
							<>
				<Image
				style={styles.recordBackground}
				source={require('../assets/images/record.jpg') }
					/>
					<Text style={[styles.trackInfo, styles.trackInfoText]}>
						{songList[currentIndex].citation_mla}
					</Text>
					</>
				)}


				<View style={styles.controls}>
								{/* prob the answer to my blinking problem
					https://stackoverflow.com/a/42348010 
					or this
					https://stackoverflow.com/a/56883227
					*/}
			
					{songList ? (
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