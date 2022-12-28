import React from "react"
import { Link } from "react-router-dom"

import "./_Header.scss"

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <Link className="header__title-container" to="/">
          <h1 className="header__title-left">MET<br />EXPLORER</h1>
        </Link>
        <nav className="nav">
          <ul>
            <li>
              <Link
                className="nav__link"
                to="/collections"
              >MY COLLECTIONS
              </Link>
            </li>
            <li>
              <Link
                className="nav__link"
                to="/search-form"
              >SEARCH
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <h2 className="header__title-right">MY<br />COLLECTIONS</h2>
    </header>
  )
}

export default Header