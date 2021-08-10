
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import MainScreen from './app/screens/AppMainScreen';  
import AboutScreen from './app/screens/AppAboutScreen';  
import OptionsScreen from './app/screens/AppOptionsScreen';  
import MoviesScreen from './app/screens/AppMoviesScreen';  
import FavoritesScreen from './app/screens/AppFavoritesScreen';  
import logger from './app/utilities/logger';  
import { Provider } from 'react-redux';
import {store} from "./app/redux/store/store";


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
	<Provider store={store}>
	  <NavigationContainer>
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
			  } else if (route.name === 'Movies') {
				iconName ='movie-filter';
			  } else if (route.name === 'Favorites') {
				iconName ='favorite';
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
		  <Tab.Screen name="Movies" component={MoviesScreen} />
		  <Tab.Screen name="Favorites" component={FavoritesScreen} />

		</Tab.Navigator>
	  </NavigationContainer>
	  </Provider>
	);
  }