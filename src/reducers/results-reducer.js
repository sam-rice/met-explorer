const resultsReducer = (state = {}, action) => {
  switch(action.type) {
    case "FETCH_RESULTS_REQUEST":
      return { isLoading: true }

    case "FETCH_RESULTS_FAILURE":
      return {
        isLoading: false,
        errorMsg: action.payload.errorMsg
      }
    
    case "FETCH_RESULTS_SUCCESS":
      return {
        isLoading: false,
        allResults: action.payload.results
      }

    case "FETCH_PAGE_REQUEST":
      return { isLoading: true }

    case "FETCH_PAGE_FAILURE":
      return {
        isLoading: false,
        errorMsg: action.payload.errorMsg
      }

    case "FETCH_PAGE_SUCCESS":
      return {
        isLoading: false,
        currentPage: action.payload.objectsData
      }

    default:
      return state
  }
}

export default resultsReducer