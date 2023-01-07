
import React from "react"
import { Route, Routes } from "react-router-dom"

import MainLayout from "../MainLayout/MainLayout"
import Home from "../Home/Home"
import CollectionsListContainer from "../../containers/CollectionsListContainer"
import CollectionViewContainer from "../../containers/CollectionViewContainer"
import SearchFormContainer from "../../containers/SearchFormContainer"
import SearchResultsViewContainer from "../../containers/SearchResultsViewContainer"
import ArtworkDetailsContainer from "../../containers/ArtworkDetailsContainer"
import ErrorPage from "../ErrorPage/ErrorPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MainLayout />} >
          <Route path="/collections" >
            <Route index element={<CollectionsListContainer />} />
            <Route path=":collectionID" element={<CollectionViewContainer />} />
          </Route>
          <Route path="/search-form" element={<SearchFormContainer />} />
          <Route path="/search" element={<SearchResultsViewContainer />} />
          <Route path="/explore" >
            <Route path=":objectID" element={<ArtworkDetailsContainer />} />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App