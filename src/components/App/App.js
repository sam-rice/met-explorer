
import React from "react"
import { Route, Routes } from "react-router-dom"

import './_App.scss'
import Header from "../Header/Header"
import MainLayout from "../MainLayout/MainLayout"
import Home from "../Home/Home"
import Collections from "../Collections/Collections"
import SearchForm from "../SearchForm/SearchForm"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MainLayout />} > 
          <Route path="/collections" element={<Collections />} />
          <Route path="/search" element={<SearchForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App