import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './components/Home'
import NewDeck from './components/NewDeck'
import DeckQuestions from './components/DeckQuestions'
import Practice from './components/Practice'
import AddCard from './components/AddCard'
import * as color from './utils/colors'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import {setLocalNotification, clearLocalNotification} from './utils/helpers'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: color.white,
    style: {
      height: 56,
      backgroundColor: color.darkblue,
    }
  }
})

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckQuestions: {
    screen: DeckQuestions,
    navigationOptions: {
      headerTintColor: color.darkblue,
    }
  },
  Practice: {
    screen: Practice,
    navigationOptions: {
      headerTintColor: color.darkblue,
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: color.darkblue,
    }
  }
})

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={color.purple} barStyle="light-content" />
          <Stack/>
        </View>
      </Provider>
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
