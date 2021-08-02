import React from "react";
import { ScrollView, View, Dimensions } from 'react-native'
import AppSoundItem from "../components/AppSoundItem";

function AppSoundComponent() {

	var Soundlist = [
		{
			title: "you're at the beach",
			soundFile: require('../assets/audio/sounds/beach.mp3'),
		},
		{
			title: 'birds are chirping',
			soundFile: require('../assets/audio/sounds/birds.mp3'),
		},
		{
			title: "you're on a boat",
			soundFile: require('../assets/audio/sounds/boat.mp3'),
		},
		{
			title: "you're camping",
			soundFile: require('../assets/audio/sounds/camping.mp3'),
		},	
		{
			title: 'a cat is purring',
			soundFile: require('../assets/audio/sounds/cat.mp3'),
		},
		{	
			title: 'a clock is ticking',
			soundFile: require('../assets/audio/sounds/clock.mp3'),
		},
		{
			title: "there are crickets",
			soundFile: require('../assets/audio/sounds/crickets.mp3'),
		},
		{
			title: "you're on a farm",
			soundFile: require('../assets/audio/sounds/farm.mp3'),
		},		
		{
			title: "you're in a field",
			soundFile: require('../assets/audio/sounds/field.mp3'),
		},
		{
			title: "there's a fire",
			soundFile: require('../assets/audio/sounds/fire.mp3'),
		},		
		{
			title: "there are frogs",
			soundFile: require('../assets/audio/sounds/frogs.mp3'),
		},	
		{	
			title: 'a hammock is swinging',
			soundFile: require('../assets/audio/sounds/hammock.mp3'),
		},
		{	
			title: "you're at a lake",
			soundFile: require('../assets/audio/sounds/lake.mp3'),
		},
		{	
			title: "it's raining with thunder",
			soundFile: require('../assets/audio/sounds/rainWithThunder.mp3'),
		},
		{	
			title: "it's raining and windy",
			soundFile: require('../assets/audio/sounds/rainWind.mp3'),
		},
		// {	
		// 	title: 'a vinyl record is playing',
		// 	soundFile: require('../assets/audio/sounds/vinyl.mp3'),
		// },
		{	
			title: "roller skates are sliding on a rail",
			soundFile: require('../assets/audio/sounds/slidingRail.mp3'),
		},
		{	
			title: "you're skating over bricks",
			soundFile: require('../assets/audio/sounds/skateBricks.mp3'),
		},
		{	
			title: "you're skating a concrete bowl",
			soundFile: require('../assets/audio/sounds/skatingConcreteBowl.mp3'),
		},
		{	
			title: "you're skating a wooden halfpipe",
			soundFile: require('../assets/audio/sounds/skateHalfpipeWood.mp3'),
		},
		{	
			title: "people are skateboarding at a park",
			soundFile: require('../assets/audio/sounds/skateboard.mp3'),
		},
		{	
			title: "people are skateboarding indoors",
			soundFile: require('../assets/audio/sounds/skateboardICC.mp3'),
		},
		{	
			title: "you're on a train",
			soundFile: require('../assets/audio/sounds/train.mp3'),
		},
		{	
			title: 'water is flowing',
			soundFile: require('../assets/audio/sounds/water.mp3'),
		},
		{	
			title: 'waves are crashing',
			soundFile: require('../assets/audio/sounds/waves.mp3'),
		},
		{	
			title: 'wheels are rolling',
			soundFile: require('../assets/audio/sounds/wheels.mp3'),
		},
	]
	return (			
		<View style={{flex:1}}>
			<ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:100}}>
				{Soundlist.map((soundInfo) => {
					return (
						<AppSoundItem key={soundInfo.title} arrayObj={soundInfo}/>
					);
				})}
			</ScrollView>
			
		</View>
	)
	}

export default AppSoundComponent;