
import React from "react"
import { Route, Routes } from "react-router-dom"

import './_App.scss'
import MainLayout from "../MainLayout/MainLayout"
import Home from "../Home/Home"
import CollectionsList from "../CollectionsList/CollectionsList"
import CollectionView from "../CollectionView/CollectionView"
import SearchForm from "../SearchForm/SearchForm"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MainLayout />} > 
          <Route path="/collections" >
            <Route index element={<CollectionsList />} />
            <Route path=":id" element={<CollectionView />} />
          </Route>
          <Route path="/search" >
            <Route index element={<SearchForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App