const collectionReducer = (state = [], action) => {
  switch(action.type) {
    case "ADD_COLLECTION":
      return [...state, { 
        name: action.payload.name,
        id: action.payload.id
      }]
    case "DELETE_COLLECTION":
      const newState = [...state]
      const targetIndex = newState.findIndex(collection => collection.id === action.payload.id)
      newState.splice(targetIndex, 1)
      return newState
    default: 
      return state
  }
}

export default collectionReducer