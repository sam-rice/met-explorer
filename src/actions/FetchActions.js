export const fetchNewSearch = (url, pageNum) => {
  return async dispatch => {
    const firstPageObjects = await dispatch(fetchResults(url, pageNum))
    dispatch(fetchPage(firstPageObjects))
  }
}

const fetchResults = (url, pageNum) => {
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
        const targetEndIndex = pageNum * 25
        const firstPageObjects = data.objectIDs.slice(targetEndIndex - 25, targetEndIndex)
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
    const promises = await objectIDs.map(async objectID => {
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
    const settledPromises = await Promise.allSettled(promises)
    const pageData = settledPromises.map(promise => promise.value)
    dispatch(fetchPageSuccess(pageData))
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