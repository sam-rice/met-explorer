let INITIAL_STATE = []

if (localStorage.getItem("collections")) {
  INITIAL_STATE = JSON.parse(localStorage.getItem("collections"))
}

const collectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_COLLECTION":
      return [...state, {
        name: action.payload.name,
        id: action.payload.id,
        pieces: []
      }]

    case "DELETE_COLLECTION":
      return state.filter(collection => collection.id !== action.payload.id)

    case "UPDATE_NOTE":
      return state.map(collection => {
        if (collection.id == action.payload.collectionID) {
          return {
            ...collection,
            pieces: collection.pieces.map(piece => {
              if (piece.objectID == action.payload.objectID) {
                return {
                  ...piece,
                  userNotes: action.payload.text
                }
              } else {
                return piece
              }
            })
          }
        } else {
          return collection
        }
      })

    case "DELETE_PIECE":
      return state.map(collection => {
        if (collection.id == action.payload.collectionID) {
          return {
            ...collection,
            pieces: collection.pieces.filter(piece => piece.objectID != action.payload.objectID)
          }
        } else {
          return collection
        }
      })

    case "ADD_TO_COLLECTION":
      return state.map(collection => {
        if (collection.id == action.payload.collectionID) {
          return {
            ...collection,
            pieces: [
              ...collection.pieces,
              {
                artistName: action.payload.piece.artistName,
                culture: action.payload.piece.culture,
                department: action.payload.piece.department,
                objectDate: action.payload.piece.objectDate,
                objectID: action.payload.piece.objectID,
                objectName: action.payload.piece.objectName,
                imageSmall: action.payload.piece.imageSmall,
                userNotes: "",
              }
            ]
          }
        } else {
          return collection
        }
      })

    default:
      return state
  }
}

export default collectionReducer