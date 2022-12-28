import { combineReducers } from "redux"
import resultsReducer from "./results-reducer"
import collectionReducer from "./collection-reducer"

const rootReducer = combineReducers({
  collections: collectionReducer,
  results: resultsReducer
})

export default rootReducer