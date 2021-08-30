import React, {useContext}  from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import { Ionicons } from '@expo/vector-icons' 

import colors from "../config/colors";
import {stopAllAudio} from '../redux/actions/audioActions';

export default AppStopButton = () => {
  const {songIsPlaying} = useSelector(state => state.audioReducer);
  const dispatch = useDispatch();

  const dispatchedStopAllAudio = () => {
    dispatch(stopAllAudio())
  };

  return (
    <TouchableOpacity style={styles.control}  onPress={dispatchedStopAllAudio}>
      {songIsPlaying ? (
        <Ionicons name='ios-stop-circle' size={48} color={colors.red} />
      ) : (
        <Ionicons name='ios-stop-circle' size={48} color={colors.inactive} />
      )}
    </TouchableOpacity>
);
}


const styles = StyleSheet.create({
	control: {
		margin: 15
	},
})


