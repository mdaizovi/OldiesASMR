import React, {useEffect} from 'react';
import { StyleSheet, ActivityIndicator, Button, Text, View, Image,  Dimensions } from 'react-native'
import { Audio } from 'expo-av'
import {useSelector, useDispatch, connect} from 'react-redux';
import Screen from "../components/Screen";
import AppSoundComponent from "../components/AppSoundComponent";
import AppSongComponent from "../components/AppSongComponent";
import colors from "../config/colors";
import settings from "../config/settings";

import {getSongList} from '../redux/actions/actionsSongPlay';


var deviceWidth = Dimensions.get('window').width; //full width

export default function MainScreen() {
	const {songListFetching, songList, songListFetchError} = useSelector(state => state.songPlayReducer);
	const dispatch = useDispatch();
    const fetchSongList = () => dispatch(getSongList());

	useEffect(() => {
		try {
			Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				staysActiveInBackground: true,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				shouldDuckAndroid: true,
				playInBackground:true,
				playThroughEarpieceAndroid: true
			})
			fetchSongList();
		} catch (e) {
			console.log("problem with useEffect in MainScreen: ",e)
		}
	  }, []);

		return (	
			<Screen style={styles.container}>

			{!songList ? (
				<ActivityIndicator animating={songListFetching} size="large"/>
			) : (
				<>
				{songListFetchError ? (
					<>
					<Text style={[styles.errorInfo]}>Couldn't load song playlist. Are you sure you're connected to the internet?</Text>
					<Button title="Retry" onPress={fetchSongList}/>
					</>
					) : (				
					<AppSongComponent/>
				)}
 			<AppSoundComponent/>
			</>
			)}
			</Screen>

		)
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