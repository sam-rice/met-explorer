export const fetchResults = (url) => {
  return async dispatch => {
    dispatch(fetchResultsRequest())
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response)
      }
      const data = await response.json()
      dispatch(fetchResultsSuccess(data))
      // if (!data.total) dispatch(fetchResultsNone())
    } catch (error) {
      console.log(error)
      dispatch(fetchResultsFailure(error))
    }
  } 
}

// export const fetchResults = (url) => {
//   return async dispatch => {
//     dispatch(fetchResultsRequest())
//     return fetch(url)
//   }
// }

const fetchResultsRequest = () => ({
  type: "FETCH_RESULTS_REQUEST"
})

export const fetchResultsSuccess = results => ({
  type: "FETCH_RESULTS_SUCCESS",
  payload: { results }
})

export const fetchResultsFailure = errorMsg => ({
  type: "FETCH_RESULTS_FAILURE",
  payload: { errorMsg }
})

export const resetSearch = () => ({
  type: "RESET_SEARCH"
})