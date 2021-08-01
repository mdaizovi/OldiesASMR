
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import GlobalState from './app/context/globalState';
import MainScreen from './app/screens/AppMainScreen';  
import AboutScreen from './app/screens/AppAboutScreen';  
import OptionsScreen from './app/screens/AppOptionsScreen';  
import logger from './app/utilities/logger';  

logger.start();

const Tab = createBottomTabNavigator();

export default function App() {
	const screenProps = {
		timerEndTime: null,
		stopAudio: false,
   }
   //    state = {
// 	timerEndTime: null,
// 	stopAudio: false,
// }
	return (
	  <NavigationContainer>
		  <GlobalState>
		<Tab.Navigator
		  initialRouteName="Home"
		  screenProps={screenProps}
		  screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
			  let iconName;
  
			  if (route.name === 'Home') {
				iconName = focused
				  ? 'musical-notes'
				  : 'musical-notes-outline';
			  } else if (route.name === 'About') {
				iconName = focused ? 'information' : 'information-outline';
			  } else if (route.name === 'Options') {
				iconName = focused ? 'options' : 'options-outline';
			  }
			  return <Ionicons name={iconName} size={size} color={color} />;
			},
		  })}
		  tabBarOptions={{
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
		  }}
		>
		  <Tab.Screen name="About" component={AboutScreen} />
		  <Tab.Screen name="Home" component={MainScreen} />
		  <Tab.Screen name="Options" component={OptionsScreen} />
		</Tab.Navigator>
		</GlobalState>
	  </NavigationContainer>
	);
  }