const collectionReducer = (state = [], action) => {
  switch(action.type) {
    case "ADD_COLLECTION":
      return [...state, { 
        name: action.payload.name,
        id: action.payload.id
      }]
    default: 
      return state
  }
}

export default collectionReducer