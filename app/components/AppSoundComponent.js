import React from "react";
import { ScrollView, View, Dimensions } from 'react-native'
import { Audio } from 'expo-av'
import AppSoundItem from "../components/AppSoundItem";

function AppSoundComponent() {

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
	}
	return (			
		<View style={{flex:1}}>
			<ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:100}}>
				{Soundlist.map((soundInfo) => {
					return (
						<AppSoundItem key={soundInfo.name} arrayObj={soundInfo}/>
					);
				})}
			</ScrollView>
		</View>
	)
	}

export default AppSoundComponent;