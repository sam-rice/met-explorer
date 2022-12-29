export const initSearch = url => {
  return async dispatch => {
    const firstPageObjects = await dispatch(fetchResults(url))
    dispatch(fetchPage(firstPageObjects))
  }
}

const fetchResults = url => {
  return async dispatch => {
    dispatch(fetchResultsRequest)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      dispatch(fetchResultsSuccess(data))
      if (data.total) {
        const firstPageObjects = data.objectIDs.slice(0, 25)
        return firstPageObjects
      }
    } catch (error) {
      dispatch(fetchResultsFailure(error))
    }
  }
}

export const fetchPage = objectIDs => {
  return async dispatch => {
    dispatch(fetchPageRequest)
    const promises = objectIDs.map(async objectID => {
      try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        const data = await response.json()
        return data
      } catch (error) {
        dispatch(fetchPageFailure(error))
      }
    })
    const resolvedPromises = await Promise.all(promises)
    dispatch(fetchPageSuccess(resolvedPromises))
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

const fetchPageRequest = () => ({
  type: "FETCH_PAGE_REQUEST"
})

const fetchPageSuccess = objectsData => ({
  type: "FETCH_PAGE_SUCCESS",
  payload: { objectsData }
})

const fetchPageFailure = errorMsg => ({
  type: "FETCH_PAGE_FAILURE",
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