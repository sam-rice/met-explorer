import React from "react"
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"

import App from './components/App/App'
import './_index.scss'
import rootReducer from "./reducers"


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const store = createStore(
  rootReducer,
  devTools
)

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store} >
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
)