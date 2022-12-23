import React from "react"
import { Link } from "react-router-dom"

import "./_SearchResultTile.scss"

function SearchResultTile() {

  return (
    <Link 
      className="result-link-wrapper" 
      to="/explore/artworkID"
    >
      <li className="result">
        <p>testing</p>
      </li>
    </Link>
  )
}

export default SearchResultTile