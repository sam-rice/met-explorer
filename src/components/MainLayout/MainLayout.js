import React from "react"
import { Outlet } from "react-router-dom"

import "./_MainLayout.scss"
import Header from "../Header/Header"

function MainLayout() {
  return (<>
    <Header />
    <main className="main-layout">
      <Outlet />
    </main>
  </>
  )
}

export default MainLayout