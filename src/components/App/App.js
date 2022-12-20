
import React from "react"
import { Route, Routes } from "react-router-dom"

import './_App.scss'
import Header from "../Header/Header"
import NavBar from "../NavBar/NavBar"

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NavBar />} />
      </Routes>
    </>
  )
}

export default App