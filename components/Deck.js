// import React, {Component} from 'react';
// import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
// import {white, gray, black} from '../utils/colors'
// import { connect } from 'react-redux'
//
//
// class Deck extends Component {
//
//
//
//   render() {
//     let decks = this.props.decks
//     if(Object.keys(decks).length > 0){
//       return (
//
//           <View style={styles.container}>
//             {Object.keys(decks).map((d) => {
//               return (
//                 <TouchableNativeFeedback
//                   onPress={() => this.props.onPress()}
//                   background={TouchableNativeFeedback.SelectableBackground()}
//                   key={d}
//                 >
//                   <View style={styles.deck}>
//
//                       <Text style={styles.title}>
//                         {decks[d].title}
//                       </Text>
//                       <Text style={styles.subject}>
//                         {decks[d].subject}
//                       </Text>
//
//                   </View>
//                 </TouchableNativeFeedback>
//
//               )
//             })}
//           </View>
//
//       )
//     }
//     else {
//       return <Text>No Decks</Text>
//     }
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: white,
//   },
//   deck: {
//     borderRadius: 4,
//     borderWidth: 1.5,
//     borderColor: black,
//     margin: 10,
//   },
//   title: {
//     paddingTop: 5,
//     fontSize: 24,
//     paddingLeft: 10,
//   },
//   subject: {
//     fontSize: 16,
//     color: 'gray',
//     paddingLeft: 10,
//     paddingBottom: 10,
//   },
// })
//
// function mapStateToProps(state){
//   return {
//     decks: state
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return {}
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Deck)
