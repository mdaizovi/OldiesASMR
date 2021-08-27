import React from 'react'
import { StyleSheet, ActivityIndicator, Button, Text, View, Image,  Dimensions } from 'react-native'
import { Audio, Video } from 'expo-av'
import {useSelector, useDispatch, connect} from 'react-redux';
import Slider from '@react-native-community/slider';
import Screen from "../components/Screen";
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import AppSoundComponent from "../components/AppSoundComponent";
import AppSongComponent from "../components/AppSongComponent";
import colors from "../config/colors";
import settings from "../config/settings";
import TextTicker from 'react-native-text-ticker'
import logger from '../utilities/logger';  
import stopAllAudio from '../redux/actions/actionsAudio';


var deviceWidth = Dimensions.get('window').width; //full width

export default class MainScreen extends React.Component {
	state = {
		masterPlaylist:null,
		playListFetchError:null,
		songIsLoading:true,
	};

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

	loadPlaylist = async () => {
		try {
			let response = await fetch(
				settings.apiUrl
			);
			if (response.status===200) {
				let json = await response.json();
				this.setState({
					songIsLoading: false,
					masterPlaylist: json,
					playListFetchError: false
				})
				return await json;
			} else {
				this.setState({
					playListFetchError: true,
					songIsLoading: false,
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

	render() {
		
		return (	
			<Screen style={styles.container}>

			{this.state.songIsLoading ? (
				<ActivityIndicator animating={this.state.songIsLoading} size="large"/>
			) : (
				<>
				{this.state.playListFetchError ? (
					<>
					<Text style={[styles.errorInfo]}>Couldn't load song playlist. Are you sure you're connected to the internet?</Text>
					<Button title="Retry" onPress={this.loadPlaylist}/>
					</>
					) : (				
					<AppSongComponent masterPlaylist={this.state.masterPlaylist}
					/>
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