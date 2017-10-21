import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {white, gray, black} from '../utils/colors'

const decks = [
  {title: 'Thermo', subject: 'Phyiscs', key: 1},
  {title: 'Hamlet', subject: 'English', key: 2}
]

export default class Deck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {decks.map((d) => {
          return (
            <View style={styles.deck} key={d.key}>
              <View>
                <Text style={styles.title}>
                  {d.title}
                </Text>
                <Text style={styles.subject}>
                  {d.subject}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  deck: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: black,
    margin: 10,
  },
  title: {
    paddingTop: 5,
    fontSize: 24,
    paddingLeft: 10,
  },
  subject: {
    fontSize: 16,
    color: 'gray',
    paddingLeft: 10,
    paddingBottom: 10,
  },
})
