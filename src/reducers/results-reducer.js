const resultsReducer = (state = {}, action) => {
  switch(action.type) {
    case "FETCH_RESULTS_REQUEST":
      return { isFetching: true }

    case "FETCH_RESULTS_FAILURE":
      return {
        isFetching: false,
        errorMsg: action.payload.errorMsg
      }
    
    case "FETCH_RESULTS_SUCCESS":
      return {
        isFetching: false,
        results: action.payload.results
      }
    default:
      return state
  }
}

export default resultsReducer