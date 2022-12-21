import React from "react"
import { Outlet } from "react-router-dom"

import Header from "../Header/Header"

function MainLayout() {
  return (<>
    <Header />
    <Outlet />
  </>
  )
}

export default MainLayout