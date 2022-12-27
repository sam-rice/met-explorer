import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteCollection } from "../../actions"

import "./_CollectionTile.scss"

import chair from "../../assets/flw-chair.png"

function CollectionTile({ name, id }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToCollection = e => {
    if (e.target.type === "submit") {
      removeCollection()
    } else {
      navigate("/collections/collectionID")
    }
  }

  const removeCollection = () => {
    dispatch(deleteCollection(id))
  }

  return (
      <li 
        className="collection"
        onClick={e => goToCollection(e)}
        key={id} 
      >
        <div className="collection__left">
          <div className="collection__left__img-container">
            <img className="collection__left__img-container__img" src={chair} />
          </div>
          <h4 className="collection__left__title">{name}</h4>
        </div>
        <div className="collection__details">
          <p className="collection__details__row">23 pieces</p>
          <button
            className="collection__details__remove-button"
          />
          <p className="collection__details__row">departments: American Decorative Arts, Asian Art, Islamic Art</p>
        </div>
      </li>
  )
}

export default CollectionTile