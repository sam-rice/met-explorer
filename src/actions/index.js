export const fetchResults = () => {
  return (dispatch) => {
    dispatch(fetchResultsRequest)
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=lautrec")
      .then(response => {
        if (!response.ok) {
          throw Error(response.message)
        } else {
          return response.json()
        }
      })
      .then(response => dispatch(fetchResultsSuccess(response)))
      .catch(error => {
        dispatch(fetchResultsFailure(error.message))
      })
  }
}

const fetchResultsRequest = () => ({
  type: "FETCH_RESULTS_REQUEST"
})

const fetchResultsSuccess = results => ({
  type: "FETCH_RESULTS_SUCCESS",
  payload: { results }
})

const fetchResultsFailure = errorMsg => ({
  type: "FETCH_RESULTS_FAILURE",
  payload: { errorMsg }
})

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