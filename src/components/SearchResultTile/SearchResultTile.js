import React from "react"
import { Link } from "react-router-dom"

import "./_SearchResultTile.scss"
import fallback from "../../assets/fallback.png"

function SearchResultTile({ data }) {
  const {artistDisplayName, title, objectDate, objectID, country, culture, department, primaryImageSmall} = data

  return (
    <Link
      className="result-link-wrapper"
      to={`/explore/${objectID}`}
    >
      <li className="result">
        <div className="result__left">
          <img
            className="result__left__thumbnail"
            src={primaryImageSmall ? primaryImageSmall : fallback}
          />
        </div>
        <div className="result__right">
          <h4>{title}</h4>
          <p className="result__right__details">{objectDate}</p>
          <p className="result__right__artist">{artistDisplayName}</p>
          <p className="result__right__details">{culture ? culture : country}</p>
          <p className="result__right__dept">department: {department}</p>
        </div>
      </li>
    </Link>
  )
}

export default SearchResultTile