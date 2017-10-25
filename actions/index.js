export const ADD_ALL_DECKS = 'ADD_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function addAllDecks(decks){
  return{
    type: ADD_ALL_DECKS,
    decks,
  }
}

export function addDeck(deck){
  return{
    type: ADD_DECK,
    deck,
  }
}

export function deleteDeck(id){
  return {
    type: DELETE_DECK,
    id,
  }
}

export function addCard({card, id}){
  return {
    type: ADD_CARD,
    id,
    card
  }
}
