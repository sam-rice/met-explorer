import React from "react"
import { Link, useLocation } from "react-router-dom"

import "./_Header.scss"

function Header() {
  const location = useLocation()

  const headerTitleRight = location.pathname.includes("/collections") ? <>MY<br />COLLECTIONS</> : <>EXPLORE</>

  return (
    <header className="header">
      <div className="header__left">
        <Link 
          className="header__left__title-container" 
          to="/"
          data-cy="home-header"
        >
          <h1 className="header__left__title-container__title">MET<br />EXPLORER</h1>
        </Link>
        <nav className="nav">
          <ul>
            <li>
              <Link
                className="nav__link"
                to="/collections"
                data-cy="collections-header"
              >MY COLLECTIONS
              </Link>
            </li>
            <li>
              <Link
                className="nav__link"
                to="/search-form"
                data-cy="search-header"
              >SEARCH
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <h2 
        className="header__title-right"
        data-cy="sub-header"
      >{headerTitleRight}</h2>
    </header>
  )
}

export default Header