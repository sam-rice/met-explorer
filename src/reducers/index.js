import { combineReducers } from "redux"
import todosReducer from "./todos-reducer"
import filterReducer from "./filter-reducer"
import collectionReducer from "./collection-reducer"

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  collections: collectionReducer
})

export default rootReducer