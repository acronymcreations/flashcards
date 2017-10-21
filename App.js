import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import Deck from './components/Deck'
import Home from './components/Home'
import NewDeck from './components/NewDeck'

const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  AddEntry: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
})

export default class App extends React.Component {
  render() {
    return (
      <Tabs/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
