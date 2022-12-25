import React, { useState } from "react"
import { Link } from "react-router-dom"

import "./_ArtworkDetail.scss"

function ArtworkDetail() {
  const [collection, setCollection] = useState("add to collection")

  return (
    <div className="artwork-view-parent">
      <span className="artwork-directory">
        <Link
          className="artwork-detail-link"
          to="/search/deptQuery"
        >The American Wing</Link>
        {" / "}
        <Link
          className="artwork-detail-link"
          to="/search/artistQuery"
        >Frank Lloyd Wright</Link>
      </span>
      <section className="artwork">
        <div className="artwork__left">
          <p className="artwork__left__saved-msg">
            this piece is saved in your collection "Early FLW"
          </p>
          <h3 className="artwork__left__title">Armchair</h3>
          <p className="artwork__left__date">ca. 1902-3</p>
          <p className="artwork__left__artist">
            <Link
              className="artwork__left__artist__link"
              to="/search/artistQuery"
            >Frank Lloyd Wright</Link>
            American
          </p>
          <article className="artwork__left__article">
            {"This set of four armchairs (1972.60.4-.7) in dark-stained oak was designed for the Littles’ first home in Peoria, Illinois, and moved with the family, eventually ending up in the living room of their new summer home. Unlike Wright's later (1912–14) furnishings in the room, these chairs include decorative applied banding, and, on each leg, stylized capitals and bases. The chairs’ cushions are covered with their original wool fabric."}
          </article>
          <p className="artwork__left__dept">
            department: American Decorative Arts
          </p>
          <div className="artwork__left__collection">
            <label
              className="artwork__left__collection__label"
              htmlFor="selected-collection"
            >search by:</label>
            <select
              className="artwork__left__collection__select"
              id="selected-collection"
              value={collection}
              onChange={e => setCollection(e.target.value)}
              required={true}
            >
              <option>select</option>
              <option>artwork name</option>
              <option>artist name</option>
            </select>
            <button
              className="artwork__left__collection__button"
            >add</button>
          </div>
        </div>
        <div className="artwork__right">

        </div>
      </section>
    </div>
  )
}

export default ArtworkDetail