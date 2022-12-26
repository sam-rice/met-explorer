import React from "react"
import { Link } from "react-router-dom"

import "./_Home.scss"
import room from "../../assets/flw-room.png"

function Home() {
  return (
    <main className="home">
      <h1 className="home__top">
        <span className="home__top__left">MET</span>
        <span className="home__top__right">EXPLORER</span>
      </h1>
      <div className="home__featured">
        <div className="home__featured__title">
          <h3>The Frank Lloyd Wright Collection</h3>
        </div>
        <br />
        <Link to="/temp">
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
            <Link className="home__bottom__right" to="/search">
              EXPLORE
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default Home