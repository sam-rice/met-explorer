const resultsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_RESULTS_REQUEST":
      return { ...state,
        isLoading: true 
      }

    case "FETCH_RESULTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload.errorMsg
      }

    case "FETCH_RESULTS_SUCCESS":
      return {
        ...state,
        allResults: action.payload.results
      }

    case "FETCH_PAGE_REQUEST":
      return { ...state,
        isLoading: true 
      }

    case "FETCH_PAGE_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload.errorMsg
      }

    case "FETCH_PAGE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        currentPageResults: action.payload.objectsData
      }

    default:
      return state
  }
}

export default resultsReducer