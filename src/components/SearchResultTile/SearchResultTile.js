import React from "react"
import { Link } from "react-router-dom"

import "./_SearchResultTile.scss"
import fallback from "../../assets/fallback.png"

function SearchResultTile({ data }) {
  const { artistDisplayName, objectName, objectDate, objectID, country, culture, department, primaryImageSmall } = data

  return (
    <Link
      className="result-link-wrapper"
      to={`/explore/${objectID}`}
      data-cy={objectID}
    >
      <li className="result">
        <div className="result__left">
          <img
            className="result__left__thumbnail"
            src={!!primaryImageSmall ? primaryImageSmall : fallback}
          />
        </div>
        <div className="result__right">
          <h4 data-cy="title">{objectName}</h4>
          <p
            className="result__right__details"
            data-cy="date"
          >{objectDate}</p>
          <p
            className="result__right__artist"
            data-cy="artist"
          >{artistDisplayName}</p>
          <p
            className="result__right__details"
            data-cy="culture"
          >{!!culture ? culture : country}</p>
          <p
            className="result__right__dept"
            data-cy="department"
          >department: {department}</p>
        </div>
      </li>
    </Link>
  )
}

export default SearchResultTile