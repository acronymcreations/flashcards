import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback, FlatList, Animated } from 'react-native';
import * as color from './../utils/colors'
import { connect } from 'react-redux'
import {addAllDecks} from '../actions'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'
import {getNotifications} from '../utils/helpers'

class Home extends Component{
  state = {
    decks: {},
    opacity: new Animated.Value(1),
  }

  componentDidMount(){
    api.getDecks().then((r) => this.props.addAllDecks(r))
  }

  goToDeck(id){
    Animated.timing(this.state.opacity, {toValue: 0, duration: 500}).start()
    setTimeout(() => {
      Animated.timing(this.state.opacity, {toValue: 1, duration: 2000}).start()
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'DeckQuestions',
        params: {
          id: id
        }
      }))
    }, 500)
  }

  render(){
    const { decks } = this.props
    let deckCards = Object.keys(decks).map((d) => {
    let cards = decks[d].questions.length === 1 ?
                decks[d].questions.length + ' Card' :
                decks[d].questions.length + ' Cards'
      return (
        <TouchableNativeFeedback
          onPress={() => this.goToDeck(d)}
          background={TouchableNativeFeedback.SelectableBackground()}
          key={d}
        >
          <Animated.View style={[styles.deck, {opacity: this.state.opacity}]}>
              <Text style={styles.title}>
                {decks[d].title}
              </Text>
              <Text style={styles.subject}>
                {decks[d].subject}
              </Text>
              <Text style={styles.cards}>
                {cards}
              </Text>
          </Animated.View>
        </TouchableNativeFeedback>
      )
    })
    return (
        <View style={styles.container}>
          <FlatList
            data={deckCards}
            renderItem={({item}) => item}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  deck: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: color.black,
    margin: 10,
  },
  title: {
    paddingTop: 5,
    fontSize: 24,
    paddingLeft: 10,
  },
  subject: {
    fontSize: 16,
    color: color.black,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  cards: {
    fontSize: 16,
    color: color.gray,
    paddingLeft: 10,
    paddingBottom: 10,
  }
})


function mapStateToProps(state){
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    addAllDecks: (data) => dispatch(addAllDecks(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
