export const fetchResults = url => {
  return (dispatch) => {
    dispatch(fetchResultsRequest)
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.message)
        } else {
          return response.json()
        }
      })
      .then(response => {
        dispatch(fetchResultsSuccess(response))
        if (response.total) {
          const firstPageObjects = response.objectIDs.slice(0, 25)
          dispatch(fetchPage(firstPageObjects))
        }
      })
      .catch(error => {
        dispatch(fetchResultsFailure(error.message))
      })
  }
}

export const fetchPage = objectIDs => {
  return (dispatch) => {
    dispatch(fetchResultsRequest)
    objectIDs.forEach(object => {
      
    })
    //forEach objectID in array, make fetch request
    //Promise.all needed
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