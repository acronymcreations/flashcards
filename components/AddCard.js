import React, {Component} from 'react'
import {Text, StyleSheet, View, TextInput, TouchableNativeFeedback, ToastAndroid, Keyboard} from 'react-native'
import {connect} from 'react-redux'
import {addCard} from '../actions/'
import * as color from '../utils/colors'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component{
  state = {
    question: '',
    answer: '',
    errorMessage: ' ',
  }

  addCard(){
    if(this.state.question.length < 5){
      this.setState({errorMessage: 'Question is too short.'})
    }else if(this.state.answer.length < 5){
      this.setState({errorMessage: 'Answer is too short.'})
    }else{
      let card = {
        question: this.state.question,
        answer: this.state.answer
      }
      api.addCard(card, this.props.id)
      this.props.addCard({card: card, id: this.props.id})
      ToastAndroid.show('Card Added', ToastAndroid.SHORT);
      this.setState({
        question: '',
        answer: '',
        errorMessage: ' '
      })
      Keyboard.dismiss();
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'DeckQuestions',
        params: {
          id: this.props.id
        }
      }))

    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Question:</Text>

        <TextInput
          autoFocus={true}
          autoCapitalize='sentences'
          placeholder='Question'
          returnKeyType='next'
          onSubmitEditing={(event) => this.refs.answer.focus()}
          maxLength={75}
          numberOfLines={3}
          multiline={true}
          textAlignVertical='top'
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />

        <Text style={styles.text}>Answer:</Text>
        <TextInput
          ref='answer'
          autoCapitalize='sentences'
          placeholder='Answer'
          returnKeyType='done'
          maxLength={75}
          numberOfLines={3}
          multiline={true}
          textAlignVertical='top'
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        <View style={styles.button}>
          <TouchableNativeFeedback
            onPress={() => this.addCard()}
            background={TouchableNativeFeedback.Ripple('white')}
          >
            <View>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 15,
  },
  input: {
    padding: 5,
    fontSize: 20,
  },
  text: {
    paddingTop: 5,
    fontSize: 24,
  },
  errorMessage: {
    color: color.red,
    fontSize: 18,
    textAlign: 'center',
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
  return {
    id
  }
}

function mapDispatchToProps(dispatch){
  return {
    addCard: (data) => dispatch(addCard(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
