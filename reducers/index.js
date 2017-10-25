import {ADD_ALL_DECKS, ADD_DECK, DELETE_DECK} from '../actions'

function flashcards(state={}, action){
  if(action.type === ADD_ALL_DECKS){
    return{
      ...state,
      ...action.decks,
    }
  }
  else if(action.type === ADD_DECK){
    return {
      ...state,
      ...action.deck,
    }
  }
  else if(action.type === DELETE_DECK){
    let new_state = state
    delete new_state[action.id]
    return new_state
  }
  else{
    return state
  }
}

export default flashcards
