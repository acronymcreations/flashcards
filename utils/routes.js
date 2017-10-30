import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from '../components/Home'
import NewDeck from '../components/NewDeck'
import DeckQuestions from '../components/DeckQuestions'
import Practice from '../components/Practice'
import AddCard from '../components/AddCard'
import * as color from './colors'

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

export const Stack = StackNavigator({
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
