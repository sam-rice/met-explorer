const resultsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_RESULTS_REQUEST":
      return { isLoadingResults: true }

    case "FETCH_RESULTS_FAILURE":
      return {
        ...state,
        isLoadingResults: false,
        errorMsg: action.payload.errorMsg
      }

    case "FETCH_RESULTS_SUCCESS":
      if (action.payload.results.objectIDs === null) {
        return {
          isLoadingResults: false,
          allResults: null
        }
      } else {
        return {
          isLoadingResults: false,
          allResults: action.payload.results
        }
      }

    case "RESET_SEARCH":
      return { isLoadingResults: true }

    default:
      return state
  }
}

export default resultsReducer