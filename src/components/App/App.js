
import React from "react"
import { Route, Routes } from "react-router-dom"

import './_App.scss'
import MainLayout from "../MainLayout/MainLayout"
import Home from "../Home/Home"
import CollectionsListContainer from "../../containers/CollectionsListContainer"
import CollectionView from "../CollectionView/CollectionView"
import SearchForm from "../SearchForm/SearchForm"
import SearchResultsView from "../SearchResultsView/SearchResultsView"
import ArtworkDetail from "../ArtworkDetail/ArtworkDetail"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MainLayout />} >
          <Route path="/collections" >
            <Route index element={<CollectionsListContainer />} />
            <Route path=":collectionID" element={<CollectionView />} />
          </Route>
          <Route path="/search" >
            <Route index element={<SearchForm />} />
            <Route path=":query" element={<SearchResultsView />} />
          </Route>
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