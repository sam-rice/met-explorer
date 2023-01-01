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
    
    // case "FETCH_RESULTS_NONE":
    //   return {
    //     ...state,
    //     currentPageResults: null,
    //     isLoadingPage: false,
    //   }

    // case "FETCH_PAGE_REQUEST":
    //   return { ...state,
    //     isLoadingPage: true 
    //   }

    // case "FETCH_PAGE_FAILURE":
    //   return {
    //     ...state,
    //     errorMsg: action.payload.errorMsg
    //   }

    // case "FETCH_PAGE_SUCCESS":
    //   return {
    //     ...state,
    //     isLoadingPage: false,
    //     currentPageResults: action.payload.objectsData
    //   }

    default:
      return state
  }
}

export default resultsReducer