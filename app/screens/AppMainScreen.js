import React from 'react'
import { StyleSheet, ActivityIndicator, Button, Text, Dimensions } from 'react-native'
import Screen from "../components/Screen";
import AppSoundComponent from "../components/AppSoundComponent";
import AppSongComponent from "../components/AppSongComponent";
import colors from "../config/colors";
import settings from "../config/settings";
import logger from '../utilities/logger';  

export default class MainScreen extends React.Component {
	state = {
		songIsLoading:true,
		playListFetchError:null,
		masterPlaylist:null,
	};

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
						<>
						<AppSongComponent/>
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
	errorInfo: {
		fontSize: 25,
		margin: 20,
		height: 150,
		textAlign: 'center',
		flexWrap: 'wrap',
		color: colors.veryLightGrey,
	},
})