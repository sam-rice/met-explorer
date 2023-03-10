import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"

import App from './components/App/App'
import './_index.scss'
import rootReducer from "./reducers"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
  localStorage.setItem("collections", JSON.stringify(store.getState().collections))
})

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store} >
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
)

if (window.Cypress) {
  window.store = store
}