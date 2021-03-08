import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, View, Image, Text,  Dimensions } from 'react-native'
import { List, ListItem } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Audio, Video } from 'expo-av'
import Slider from '@react-native-community/slider';
import {createStavkNavigator} from '@react-navigation/stack';
import {navigationContainer} from '@react-navigation/native';

//import { Playlist } from "./app/data/Playlist";
//const Playlist = require('./app/data/Playlist.json');
//import AppMusicPlayer from "../components/AppMusicPlayer";
import Screen from "../components/Screen";
import AppPlayerButton from "../components/AppPlayerButton";
import AppPlayPauseButton from "../components/AppPlayPauseButton";
import AppSoundButton from "../components/AppSoundButton";
import colors from "../config/colors";

var deviceWidth = Dimensions.get('window').width; //full width

const Playlist = [
	{
		musicFile: require('../assets/audio/music/1000/pretgirl_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/buttonup_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/jazzdanc_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Eubie_Blake-Chevy_Chase_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/burmah_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/admirat_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/duever_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/sirene_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/palestee_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/blackrag_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/dix1step_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/paleste1_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Black_Devils-MonkymanREDO_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/mohammed_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/llagoose_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/japsand_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/wabashbl_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/acehole_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/pastime_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/budhabit_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/ohmabel_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Parham-Washboard_Wiggles_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/wotlido_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/bhoosier_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/onesweet_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Bennie_Motens_KC_Jazz_Band-South_1924_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/cried4u_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/spanlove_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/omissrag_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/onlygirl_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/sheik_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/ivanhoe_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/istuttr_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/kentuckb_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/jackgal_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/mandy1_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/pozzo_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/amazgrac_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Howard_Lanin_When_Eyes_Of_Blue_Are_Foolin__You_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/lowdown_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Broadway_Nitelites_I_Wanna_Be_Loved_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/train_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/zulublue_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Raderman-Japanese_Sandman_8KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/hotlips_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/panama_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/mostomp_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Alexander_Wheres_That_Band_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Raderman_Jazz_Orch-Dardanella_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/stolmgal_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/lupe_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/smiles_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/south_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Erskine_Tate_Chinaman_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/dippermo_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/steppins_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/clement2_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Bucktown_5_Hot_Mittens_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/henpeckd_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/dardanel_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/wimwithu_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/cushfoot_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/buglcall_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/iaintgot_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/changes_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/sugarft_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/surshimy_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/newbaby_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/otpump_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Henpecked_Blues_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/hotmama_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Eubie_Blake-Charleston_Rag_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/siskate_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/hflouisv_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/lovrlane_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/urbones_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Bennie_Moten_Kater_St._Rag_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Somebodys_Wrong_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/goldleaf_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/kcshuffl_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/HoldMe_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/nickleod_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Helen_Kane-IWannabeLovedbyYou_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Washingtonians-Tishomingo_Blues_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/imaginat_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/The_Georgians-You_Tell_Her_I_Stutter_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/overther_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/paleste2_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/yestrday_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/jsandman_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/copenhag_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/crawdadd_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/deedido_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/afghanis_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/iknoukno_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/bluerose_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/keepgoin_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/vododeo_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/kckitty_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/dardan2_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/CA_Ramblers_Animal_Crackers_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Vo_Do_Do_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/chocoboy_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/jazmeblu_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/quaktown_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/swhenry_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/istutter_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/wangwang_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Golden_Gate_Orch-5_Foot_2_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/sentgent_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Ambassadors_Me_And_The_Man_In_The_Moon_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/clement1_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/piknemup_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/lstablbl_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/4or5x_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/ka-lu-a_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/nevrknew_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/leftalon_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Ragtimers-Sister_Kate_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/Whiteman-Whispering_11KHz_64kb.mp3'),
	},
	{
		musicFile: require('../assets/audio/music/1000/singusin_64kb.mp3'),
	},
]

var Soundlist = [
	{
		name: "you're at the beach",
		soundFile: require('../assets/audio/sounds/beach.mp3'),
	},
	{
		name: 'birds are chirping',
		soundFile: require('../assets/audio/sounds/birds.mp3'),
	},
	{
		name: "you're on a boat",
		soundFile: require('../assets/audio/sounds/boat.mp3'),
	},
	{
		name: "you're camping",
		soundFile: require('../assets/audio/sounds/camping.mp3'),
	},	
	{
		name: 'a cat is purring',
		soundFile: require('../assets/audio/sounds/cat.mp3'),
	},
	{	
		name: 'a clock is ticking',
		soundFile: require('../assets/audio/sounds/clock.mp3'),
	},
	{
		name: "there are crickets",
		soundFile: require('../assets/audio/sounds/crickets.mp3'),
	},
	{
		name: "you're on a farm",
		soundFile: require('../assets/audio/sounds/farm.mp3'),
	},		
	{
		name: "you're in a field",
		soundFile: require('../assets/audio/sounds/field.mp3'),
	},
	{
		name: "there's a fire",
		soundFile: require('../assets/audio/sounds/fire.mp3'),
	},		
	{
		name: "there are frogs",
		soundFile: require('../assets/audio/sounds/frogs.mp3'),
	},	
	{	
		name: 'a hammock is swinging',
		soundFile: require('../assets/audio/sounds/hammock.mp3'),
	},
	{	
		name: "you're at a lake",
		soundFile: require('../assets/audio/sounds/lake.mp3'),
	},
	{	
		name: "it's raining with thunder",
		soundFile: require('../assets/audio/sounds/rainWithThunder.mp3'),
	},
	{	
		name: "it's raining and windy",
		soundFile: require('../assets/audio/sounds/rainWind.mp3'),
	},
	{	
		name: 'a vinyl record is playing',
		soundFile: require('../assets/audio/sounds/vinyl.mp3'),
	},
	{	
		name: "roller skates are sliding on a rail",
		soundFile: require('../assets/audio/sounds/slidingRail.mp3'),
	},
	{	
		name: "you're skating over bricks",
		soundFile: require('../assets/audio/sounds/skateBricks.mp3'),
	},
	{	
		name: "you're skating in a concrete bowl",
		soundFile: require('../assets/audio/sounds/skatingConcreteBowl.mp3'),
	},
	{	
		name: "you're skating a wooden halfpipe",
		soundFile: require('../assets/audio/sounds/skateHalfpipeWood.mp3'),
	},
	{	
		name: "people are skateboarding at a park",
		soundFile: require('../assets/audio/sounds/skateboard.mp3'),
	},
	{	
		name: "people are skateboarding in a garage",
		soundFile: require('../assets/audio/sounds/skateboardICC.mp3'),
	},
	{	
		name: "you're on a train",
		soundFile: require('../assets/audio/sounds/train.mp3'),
	},
	{	
		name: 'water is flowing',
		soundFile: require('../assets/audio/sounds/water.mp3'),
	},
	{	
		name: 'waves are crashing',
		soundFile: require('../assets/audio/sounds/waves.mp3'),
	},
	{	
		name: 'wheels are rolling',
		soundFile: require('../assets/audio/sounds/wheels.mp3'),
	},
]
for (var i = 0; i < Soundlist.length; i++) {
	var sound = Soundlist[i];
	sound.soundObject = new Audio.Sound();
	sound.state = {isLoaded: false, isPlaying: false, volume: 0.25};
}

var startingTracksUnPlayed =  Array.from({length: Playlist.length}, (_, index) => index);
var startingRandomIndex = Math.floor(Math.random() * Playlist.length);
startingTracksUnPlayed.splice(startingRandomIndex, 1);

export default class MainScreen extends React.Component {

	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: startingRandomIndex,
		nextIndex: null, // will be replaced.
		volume: 0.75,
		isBuffering: true,
		tracksUnPlayed :  startingTracksUnPlayed,
		tracksPlayed : [startingRandomIndex]
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
		const { playbackInstance, isPlaying, volume } = this.state
		var currentIndex = this.state.currentIndex
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.chooseNextTrack()
			var nextIndex = this.state.nextIndex
			currentIndex = nextIndex
		}

		try {
			const playbackInstance = new Audio.Sound()
			const source = Playlist[currentIndex].musicFile
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
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})

	}

	chooseNextTrack = () => {
		var tracksUnPlayed = this.state.tracksUnPlayed
		var tracksPlayed = this.state.tracksPlayed
		var nextIndex = this.state.nextIndex

		if (tracksUnPlayed.length === 0) {
			// start over
			// but first make sure next track is from first 25% of songs played
			quarterLen = Math.floor(tracksPlayed.length / 4)
			firstQuartile = tracksPlayed.slice(0, quarterLen)
			var randomUnPlayedIndex = firstQuartile[Math.floor(Math.random() * firstQuartile.length)];
			// okay now really start over.
			tracksUnPlayed = Array.from({length: Playlist.length}, (_, index) => index),
			tracksPlayed = []
		} else {
			var randomUnPlayedIndex = tracksUnPlayed[Math.floor(Math.random() * tracksUnPlayed.length)];
		}
		tracksPlayed.push(randomUnPlayedIndex);
		const removeIndex = tracksUnPlayed.indexOf(randomUnPlayedIndex);
		tracksUnPlayed.splice(removeIndex, 1);
		nextIndex = randomUnPlayedIndex;
		this.setState({
			nextIndex,
			tracksPlayed,
			tracksUnPlayed
		})


	}

	handleNextTrack = async () => {
		this.loadAudio()
	}

	handlePlaySound = async arrayObj => {
		const soundObject = arrayObj.soundObject

		try {
			var soundState = arrayObj.state
			if (soundState.isLoaded === false) {
				await soundObject.loadAsync(arrayObj.soundFile)
				.catch(error => {
					console.log(error)
				})
				soundState.isLoaded = true;
				const initialVolume = soundState.volume;
				soundObject.setStatusAsync({ volume: initialVolume })
				this.setState({soundState})
			}
			if (soundState.isPlaying === true) {
				await soundObject.pauseAsync()
				.catch(error => {
					console.log(error)
				})
				soundState.isPlaying = false;
				this.setState({soundState})
			}  else {
				soundObject.setIsLoopingAsync(true)
				await soundObject.playAsync()
				.catch(error => {
					console.log(error)
			})
			soundState.isPlaying = true;
			this.setState({soundState})
		   }
		} catch (error) {
			console.log(error)
		}
	}

	handleSlide = async (arrayObj , value) => {
		const soundObject = arrayObj.soundObject
		var soundState = arrayObj.state
		const currentVolume = soundState.volume;
		soundState.volume = value;
		this.setState({soundState})
		if (soundState.isLoaded === true) {
			soundObject.setStatusAsync({ volume: value })
		}
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

				<View style={{flex:1}}>
  				<ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:100}}>
				{Soundlist.map((soundInfo) => {
					return (
						<View key={soundInfo.name} style={styles.soundContainer}>
							<AppSoundButton name={soundInfo.name} isPlaying={soundInfo.state.isPlaying} onPress={() => this.handlePlaySound(soundInfo)}/>
							
							{soundInfo.state.isPlaying ? (
								<Slider
									style={styles.volumeSlider}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryLightGrey}
									maximumTrackTintColor={colors.active}
									thumbTintColor={colors.active}
									value={soundInfo.state.volume}
									onValueChange={value => this.handleSlide(soundInfo, value)}
								/>
							) : (
								<Slider
									style={styles.volumeSlider}
									minimumValue={0}
									maximumValue={1}
									minimumTrackTintColor={colors.veryDarkGrey}
									maximumTrackTintColor={colors.inactive}
									thumbTintColor={colors.inactive}
									value={soundInfo.state.volume}
									onValueChange={value => this.handleSlide(soundInfo, value)}
							/>
							)}

						</View>
					);
				})}
			</ScrollView>
			</View>
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
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	},
	soundContainer: {
		height: 100,
		width:deviceWidth,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
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
		marginTop: 25, 
	},
})