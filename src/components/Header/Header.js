import React from "react"
import { Link } from "react-router-dom"

import "./_Header.scss"

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title-left">MET<br />EXPLORER</h1>
        <nav className="nav">
          <Link 
            className="nav__link" 
            to="/my-collections"
          >MY COLLECTIONS
          </Link>
          <Link 
            className="nav__link" 
            to="/search"
          >SEARCH
          </Link>
        </nav>
      </div>
      <h2 className="header__title-right">MY COLLECTIONS</h2>
    </header>
  )
}

export default Header