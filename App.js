import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MainScreen from './app/screens/AppMainScreen';  
import AboutScreen from './app/screens/AppAboutScreen';  

const Tab = createBottomTabNavigator();


export default function App() {
	return (
	  <NavigationContainer>
		<Tab.Navigator
		  screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
			  let iconName;
  
			  if (route.name === 'Home') {
				iconName = focused
				  ? 'music-circle'
				  : 'music-circle-outline';
			  } else if (route.name === 'About') {
				iconName = focused ? 'information' : 'information-outline';
			  }
			  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
			},
		  })}
		  tabBarOptions={{
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
		  }}
		>
		  <Tab.Screen name="Home" component={MainScreen} />
		  <Tab.Screen name="About" component={AboutScreen} />
		</Tab.Navigator>
	  </NavigationContainer>
	);
  }