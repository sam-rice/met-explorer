import React from "react"
import { Link } from "react-router-dom"

import "./_CollectionTile.scss"

import chair from "../../assets/flw-chair.png"

function CollectionTile() {
  return (
    <Link className="collection-link-wrapper" to="/collections/collectionID" >
      <li className="collection">
        <div className="collection__left">
          <div className="collection__left__img-container">
            <img className="collection__left__img-container__img" src={chair} />
          </div>
          <h4 className="collection__left__title">Early FLW</h4>
        </div>
        <div className="collection__details">
          <p className="collection__details__row">23 pieces</p>
          <p className="collection__details__row">departments: American Decorative Arts, Asian Art, Islamic Art</p>
        </div>
      </li>
    </Link>
  )
}

export default CollectionTile