import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import Deck from './../components/Deck'
import * as color from './../utils/colors'
import { connect } from 'react-redux'
import {addAllDecks} from '../actions'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'

class Home extends Component{

  componentDidMount(){
    api.getDecks().then((r) => this.props.addAllDecks(r))
  }

  goToDeck(){
    console.log("button pressed", this.props)
    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'DeckQuestions'}))
  }

  render(){
    console.log(this.props)
    let decks = this.props.decks
    if(Object.keys(decks).length > 0){
      return (
          <View style={styles.container}>
            {Object.keys(decks).map((d) => {
              return (
                <TouchableNativeFeedback
                  onPress={() => this.goToDeck()}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  key={d}
                >
                  <View style={styles.deck}>
                      <Text style={styles.title}>
                        {decks[d].title}
                      </Text>
                      <Text style={styles.subject}>
                        {decks[d].subject}
                      </Text>
                  </View>
                </TouchableNativeFeedback>
              )
            })}
          </View>
      )
    }
    else {
      return <Text>No Decks</Text>
    }
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
    color: color.gray,
    paddingLeft: 10,
    paddingBottom: 10,
  },
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
