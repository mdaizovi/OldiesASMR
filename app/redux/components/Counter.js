import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';


export default class AppCounter extends Component {
  state = { count: 0 };
  decrementCount() {
    let { count } = this.state;
    count--;
    this.setState({
      count
    })
  }
  incrementCount() {
    let { count } = this.state;
    count++;
    this.setState({
      count
    })
  }
  render() {
    const { count } = this.state;
    return (
      <View styles={styles.container}>
        <Button
          title="increment"
          onPress={() => this.incrementCount()}
        />
        <Text>{count}</Text>
        <Button
          title="decrement"
          onPress={() => this.decrementCount()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});