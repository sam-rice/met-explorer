import { Link } from "react-router-dom"

import "./_Home.scss"

function Home() {
  return (
    <main className="home">
      <h1 className="home__top">
        <span 
          className="home__top__left"
          data-cy="title-left"
        >MET</span>
        <span 
          className="home__top__right"
          data-cy="title-right"
        >EXPLORER</span>
      </h1>
      <div 
        className="home__featured"
        data-cy="featured-parent"
      >
        <div className="home__featured__title">
          <h3>William Morris & Contemporaries</h3>
        </div>
        <br />
        <Link to="/search?query=william+morris&type=keyword&dept=12&page=1">
          <button 
            className="home__featured__button"
            data-cy="view-featured"
          >view</button>
        </Link>
      </div>
      <nav className="home__bottom">
        <ul>
          <li className="home__bottom__left">
            <Link 
              to="/collections"
              data-cy="collections-link"
            >
              MY COLLECTIONS
            </Link>
          </li>
          <li className="home__bottom__right">
            <Link 
              to="/search-form"
              data-cy="explore-link"
            >
              EXPLORE
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default Home