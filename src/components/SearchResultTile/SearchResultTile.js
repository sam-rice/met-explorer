import React from "react"
import { Link } from "react-router-dom"

import "./_SearchResultTile.scss"
import latrec from "../../assets/latrec.jpeg"

function SearchResultTile() {

  return (
    <Link
      className="result-link-wrapper"
      to="/explore/artworkID"
    >
      <li className="result">
        <div className="result__left">
          <img
            className="result__left__thumbnail"
            src={latrec}
          />
        </div>
        <div className="result__right">
          <h4>The Englishman (William Tom Warrener, 1861–1934) at the Moulin Rouge</h4>
          <p className="result__right__details">1892</p>
          <Link
            className="result__right__artist"
            to="/search/artistSearch"
          >Henri de Tolouse-Latrec
          </Link>
          <p className="result__right__details">French</p>
          <p className="result__right__dept">department: European Paintings</p>
        </div>
      </li>
    </Link>
  )
}

export default SearchResultTile