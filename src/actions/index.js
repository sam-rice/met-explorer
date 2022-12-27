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

export const createCollection = (name, id) => ({
  type: "ADD_COLLECTION",
  payload: { 
    name,
    id
  }
})