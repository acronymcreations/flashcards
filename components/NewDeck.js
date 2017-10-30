import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableNativeFeedback, Keyboard } from 'react-native';
import * as api from '../utils/api'
import * as color from '../utils/colors'
import { connect } from 'react-redux'
import {addDeck} from '../actions'
import { NavigationActions } from 'react-navigation'

class NewDeck extends Component{
  state = {
    title: '',
    subject: '',
    allowSubmit: true,
    errorMessage: ' ',
  }

  submitNewDeck(){
    const {title, subject} = this.state
    let errorMessage = ''

    if(subject.length < 5)
      errorMessage = 'Subject is too short.'
    if(title.length < 5)
      errorMessage = 'Title is too short.'

    this.setState({errorMessage})

    if(errorMessage === ''){
      this.setState({errorMessage: ' '})
      let deck = {
        title,
        subject,
        questions: []
      }

      Keyboard.dismiss();

      this.setState({
        title: '',
        subject: '',
        errorMessage: ' ',
      })

      let complete = {}
      complete[title] = deck

      this.props.addDeck(complete)
      api.addDeck({id: title, deck: deck}).then(() => {
        this.props.navigation.dispatch(NavigationActions.navigate({
          routeName: 'DeckQuestions',
          params: {
            id: title
          }
        }))
      })

    }

  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Title:</Text>
        <TextInput
          autoFocus={true}
          autoCapitalize='words'
          placeholder='Title'
          returnKeyType='next'
          onSubmitEditing={(event) => this.refs.subject.focus()}
          maxLength={25}
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Text style={styles.text}>Subject:</Text>
        <TextInput
          ref='subject'
          autoCapitalize='words'
          placeholder='Subject'
          returnKeyType='done'
          onSubmitEditing={() => this.submitNewDeck()}
          maxLength={25}
          style={styles.input}
          onChangeText={(subject) => this.setState({subject})}
          value={this.state.subject}
        />
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        <View style={styles.button}>
          <TouchableNativeFeedback
            onPress={() => this.submitNewDeck()}
            background={TouchableNativeFeedback.Ripple('white')}
          >
            <View>
              <Text style={styles.buttonText}>Create</Text>
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
    height: 40,
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

function mapStateToProps(state){
  return {}
}

function mapDispatchToProps(dispatch){
  return {
    addDeck: (data) => dispatch(addDeck(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
