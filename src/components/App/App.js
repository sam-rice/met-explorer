
import React from "react"
import { Route, Routes } from "react-router-dom"

import './_App.scss'
import MainLayout from "../MainLayout/MainLayout"
import Home from "../Home/Home"
import CollectionsListContainer from "../../containers/CollectionsListContainer"
import CollectionViewContainer from "../../containers/CollectionViewContainer"
import SearchForm from "../SearchForm/SearchForm"
import SearchResultsViewContainer from "../../containers/SearchResultsViewContainer"
import ArtworkDetail from "../ArtworkDetail/ArtworkDetail"

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
          <Route path="/search-form" element={<SearchForm />} />
          <Route path="/search" element={<SearchResultsViewContainer />} />
          <Route path="/explore" >
            {/* index redirect to homepage here */}
            <Route path=":arworkID" element={<ArtworkDetail />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App