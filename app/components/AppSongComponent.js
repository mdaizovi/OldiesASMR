import React from 'react';
import { Audio, Video  } from 'expo-av'
import {useSelector, useDispatch, useStore, connect} from 'react-redux';
import { StyleSheet, ActivityIndicator, Button, Text, View, Image,Dimensions } from 'react-native'

import Slider from '@react-native-community/slider';

//import store from '../redux/store/store.js'; 
import settings from "../config/settings";
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import colors from "../config/colors";
import TextTicker from 'react-native-text-ticker'

import {getSongList, changeSongVolume, playSong, pauseSong, loadSong, unloadSong, changeSongIndex, audioAddedToSoundList} from '../redux/actions/audioActions';

var deviceWidth = Dimensions.get('window').width; //full width

export default function AppSongComponent() {

	const {songList, audioHasBeenStopped, songCanBePaused, songListFetchError, songIsPlaying, songPlaybackInstance, currentIndex, volume} = useSelector(state => state.audioReducer);
	const store = useStore();
	const dispatch = useDispatch();
	const fetchSongList = () => dispatch(getSongList());
	const dispatchedChangeSongVolume = value => dispatch(changeSongVolume(value));
	const dispatchedPauseSong = songPlaybackInstance => dispatch(pauseSong(songPlaybackInstance));
	const dispatchedPlaySong = songPlaybackInstance => dispatch(playSong(songPlaybackInstance));
	const dispatchedloadSong = songPlaybackInstance => dispatch(loadSong(songPlaybackInstance));
	//const dispatchedAddSound = songPlaybackInstance => dispatch(audioAddedToSoundList(songPlaybackInstance));
	const dispatchedunloadSong = songPlaybackInstance => dispatch(unloadSong(songPlaybackInstance));
	const dispatchedChangeSongIndex = value => dispatch(changeSongIndex(value));
	
	//used to be async. should be again?
	handleSongVolume = async (value) => {
		if (songPlaybackInstance != null) { 
		  await songPlaybackInstance.setStatusAsync({volume: value })
		}
		//;} // what was that there for?
		dispatchedChangeSongVolume(value);
	};

	handlePlayPause = async () => {
		
		if (songPlaybackInstance===null) {
			console.log("need to load audio");
			await loadAudio()
		} else {
			let songStatus = await songPlaybackInstance.getStatusAsync();
			if (songStatus.isLoaded === true) {
				// ignore play/pause if song is not loaded yet.
				if (songIsPlaying) {
					console.log("need to pause active song");
					dispatchedPauseSong(songPlaybackInstance);
				} else {
					// use case: we have songPlaybackInstance but it's not playing
					if (audioHasBeenStopped === false) {
						console.log("we have a song but it's not playing");
						dispatchedPlaySong(songPlaybackInstance);
					}
				}
			}
		}
	}

	handleNextTrackButtonPush = async () => {
		let song_id = songList[currentIndex].id;
		let songStatus = await songPlaybackInstance.getStatusAsync()
		// .then(function(result) {
		//   console.log(result.durationMillis);
		//   console.log(result);
		// })
		// OMG finally a solution to multiple songs playing at once!
		// Just ignore those clicks if next song is not even loaded yet
		if (songStatus.isLoaded === true) {
			await noteSkippedSong(song_id); 
			handleNextTrack();
		}
	}

	handleNextTrack = async () => {
		handleNextSongIndex()
		await loadAudio(); 
	}

	handleNextSongIndex = async () => {
		if (currentIndex === songList.length - 1) {
			//start over if currently on the last track of playlist
			fetchSongList();
			dispatchedChangeSongIndex(0);
		} else {
			dispatchedChangeSongIndex(currentIndex + 1);
		}
	}

	onPlaybackStatusUpdate = status => {
		let didJustFinish = status.didJustFinish;
		if (didJustFinish === true) {
			console.log("didJustFinish is about to handle the next");
		  	// play next song. increment index, unload old song, load new song.
			handleNextTrack()
		}
	  }

	loadAudio = async () => {
		console.log("load audio");
		
		if (songList === null) {
			await fetchSongList();
		}

		if (songListFetchError === false && songList.length > 0) {

			if (songPlaybackInstance) {
				console.log("unloading existing song");
				dispatchedunloadSong(songPlaybackInstance);
			} 

			try {
				console.log("time to load new song");
				console.log("currentIndex: ", currentIndex);
				const newSongPlaybackInstance = new Audio.Sound()
				const source = {
					uri: songList[currentIndex].streaming_url
				}
				const status = {
					shouldPlay: songIsPlaying,
					volume: volume
				}
				newSongPlaybackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
				await newSongPlaybackInstance.loadAsync(source, status, false)
				dispatchedloadSong(newSongPlaybackInstance);
				dispatchedPlaySong(newSongPlaybackInstance);

			} catch (e) {
				console.log(e)
			}

		} else {
			console.log("playlist error or no songs");
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
	};


	return (			
		<>
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
						<AppPlayPauseButton onPress={handlePlayPause} songCanBePaused={songCanBePaused}/>
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
					<AppPlayerButton iconName="navigate-next" onPress={handleNextTrackButtonPush}/>

				</View>

				<View style={styles.separator}>
				</View>

		</>
	)
}


const styles = StyleSheet.create({
  	recordBackground: {
		width:deviceWidth,
		height:deviceWidth / 1.7778 // ratio of record image.
	},
	controls: {
		flexDirection: 'row',
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