export const fetchResults = (url) => {
  return async dispatch => {
    dispatch(fetchResultsRequest())
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      dispatch(fetchResultsSuccess(data))
      // if (!data.total) dispatch(fetchResultsNone())
    } catch (error) {
      dispatch(fetchResultsFailure(error))
    }
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

export const resetSearch = () => ({
  type: "RESET_SEARCH"
})