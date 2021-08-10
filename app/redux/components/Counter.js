import React, { Fragment, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import colors from "../../config/colors";

const SimpleCounter = (props) => {

  const increment = () => {
    props.dispatch(incrementAction());
  };

  const decrement = () => {
    props.dispatch(decrementAction());
  };

  const handleInputChange = (event) => {
    props.dispatch(changeByAmount(event.nativeEvent.text));
  };

    return (
      <View style={styles.container}>
        <Text>Counter: {props.amount}</Text>
        <View style = {styles.floatingView}>
          <TouchableOpacity style ={styles.floatingButton}
            onPress={increment}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.floatingButton}
          onPress={decrement}>
            <Text>-</Text>
          </TouchableOpacity>
        </View>
        <TextInput onSubmitEditing = {handleInputChange} keyboardType = 'numeric' placeholder= "change amount"/> 
      </View>)
    }

const styles = StyleSheet.create({
  floatingView: {},
  floatingButton: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.darkGrey,
    paddingHorizontal:20,
    width:'100%',
  },
});

//export default SimpleCounter;
const mapStateToProps = (state, props) => {
  return { amount: state.counter.amount };
}
export default connect(mapStateToProps)(SimpleCounter);