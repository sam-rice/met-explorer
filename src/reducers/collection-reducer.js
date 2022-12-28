const collectionReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_COLLECTION":
      return [...state, {
        name: action.payload.name,
        id: action.payload.id,
        pieces: [
          {
            objectID: 275,
            artistName: "Frank Lloyd Wright",
            artistID: 162765,
            department: "The American Wing",
            title: "Armchair",
            culture: "American",
            objectEndDate: 1903,
            imageSmall: "https://images.metmuseum.org/CRDImages/dp/web-large/DP835929.jpg",
            userNotes: ""
          }
        ]
      }]
    case "DELETE_COLLECTION":
      return state.filter(collection => collection.id !== action.payload.id)
    // case "UPDATE_NOTE":
    default:
      return state
  }
}

export default collectionReducer