import React from "react"
import { Link } from "react-router-dom"

import "./_Home.scss"

function Home() {
  return (
    <main className="home">
      <h1 className="home__top">
        <span className="home__top__left">MET</span>
        <span className="home__top__right">EXPLORER</span>
      </h1>
      <div className="home__featured">
        <div className="home__featured__title">
          <h3>William Morris & Contemporaries</h3>
        </div>
        <br />
        <Link to="/search?query=william+morris&type=keyword&dept=12&page=1">
          <button 
            className="home__featured__button"
          >view</button>
        </Link>
      </div>
      <nav className="home__bottom">
        <ul>
          <li>
            <Link className="home__bottom__left" to="/collections">
              MY COLLECTIONS
            </Link>
          </li>
          <li>
            <Link className="home__bottom__right" to="/search-form">
              EXPLORE
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default Home