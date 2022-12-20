import { combineReducers } from "redux"
import todosReducer from "./todos-reducer"
import filterReducer from "./filter-reducer"

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
})

export default rootReducer