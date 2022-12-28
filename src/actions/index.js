// export const addTodo = (text, id) => ({
//   type: "ADD_TODO",
//   payload: {
//     text,
//     id
//   }
// })

// export const toggleTodo = id => ({
//   type: "TOGGLE_TODO",
//   id
// })

// export const setFilter = filter => ({
//   type: "SET_FILTER",
//   filter
// })

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