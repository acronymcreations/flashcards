import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Button, ToastAndroid } from 'react-native';
import { connect } from 'react-redux'
import * as color from '../utils/colors'
import * as api from '../utils/api'
import { FontAwesome } from '@expo/vector-icons'
import {deleteDeck} from '../actions'
import { NavigationActions } from 'react-navigation'

class DeckQuestions extends Component{
  state = {
    question: 0,
    correct: 0,
    incorrect: 0,
  }

  goToPractice(id){
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Practice',
      params: {
        id: id
      }
    }))
  }

  goToAddCard(id){
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'AddCard',
      params: {
        id: id
      }
    }))
  }

  componentDidMount(){
    const {setParams} = this.props.navigation;
    setParams({deleteDeck: this.deleteDeck});
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    let title = navigation.state.params.id
    return {
      headerRight: <FontAwesome
                    style={styles.trashcan}
                    name='trash'
                    size={30}
                    color={color.darkblue}
                    onPress={(data) => state.params.deleteDeck()}
                  />,
      title: title,
      headerStyle:{
        backgroundColor: color.white,
      },
    }
  }

  deleteDeck = () => {
    api.removeDeck(this.props.id).then(() => {
      this.props.deleteDeck(this.props.id)
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'Home',
        params: {},
      }))
    })
    ToastAndroid.show('Deck Deleted', ToastAndroid.SHORT);
  }

  render(){
    let cards = this.props.questions.length === 1 ?
                this.props.questions.length + ' Card' :
                this.props.questions.length + ' Cards'
    return(
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subject}>{this.props.subject}</Text>
          <Text style={styles.cards}>{cards}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.button}>
            <TouchableNativeFeedback
              onPress={() => this.goToPractice(this.props.id)}
              background={TouchableNativeFeedback.Ripple('white')}
            >
              <View>
                <Text style={styles.buttonText}>Practice</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.button}>
            <TouchableNativeFeedback
              onPress={() => this.goToAddCard(this.props.id)}
              background={TouchableNativeFeedback.Ripple('white')}
            >
              <View>
                <Text style={styles.buttonText}>Add Cards</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trashcan: {
    marginRight: 10,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  bottom: {

    alignItems: 'stretch',
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 34,
  },
  subject: {
    fontSize: 24,
  },
  cards: {
    fontSize: 18,
    color: color.gray,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: color.darkblue,
  },
  buttonText: {
    color: color.white,
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
  }
})

function mapStateToProps(state, ownProps){
  let id = ownProps.navigation.state.params.id
  if(id in state){
    return{
      id: id,
      title: state[id].title,
      subject: state[id].subject,
      questions: state[id].questions,
    }
  }
  else{
    return {
      id: id,
      title: 'Deck not Found',
      subject: '',
      questions: [],
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    deleteDeck: (data) => dispatch(deleteDeck(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckQuestions);
