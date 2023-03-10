export const createCollection = name => ({
  type: "ADD_COLLECTION",
  payload: {
    name,
    id: Date.now()
  }
})

export const deleteCollection = id => ({
  type: "DELETE_COLLECTION",
  payload: { id }
})

export const updateNote = (text, collectionID, objectID) => ({
  type: "UPDATE_NOTE",
  payload: {
    text,
    collectionID,
    objectID
  }
})

export const deletePiece = (collectionID, objectID) => ({
  type: "DELETE_PIECE",
  payload: {
    collectionID,
    objectID
  }
})

export const addToCollection = ({ collectionID, artistName, culture, department, objectDate, objectID, objectName, imageSmall }) => ({
  type: "ADD_TO_COLLECTION",
  payload: {
    collectionID,
    piece: {
      artistName,
      culture,
      department,
      objectDate,
      objectID,
      objectName,
      imageSmall
    }
  }
})