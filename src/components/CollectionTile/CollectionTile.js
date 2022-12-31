import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteCollection } from "../../actions"

import "./_CollectionTile.scss"

import chair from "../../assets/flw-chair.png"

function CollectionTile({ name, id, count, deptList, thumbnail }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToCollection = e => {
    if (e.target.type === "submit") {
      removeCollection()
    } else {
      navigate(`/collections/${id}`)
    }
  }

  const removeCollection = () => {
    dispatch(deleteCollection(id))
  }

  const pieceCount = `${count} piece${count === 1 ? "" : "s"}`

  return (
      <li 
        className="collection"
        onClick={e => goToCollection(e)}
      >
        <div className="collection__left">
          <div className="collection__left__img-container">
            <img className="collection__left__img-container__img" src={thumbnail} />
          </div>
          <h4 className="collection__left__title">{name}</h4>
        </div>
        <div className="collection__details">
          <p className="collection__details__row">{pieceCount}</p>
          <button
            className="collection__details__remove-button"
          />
          <p className="collection__details__row">{deptList[0] && `departments: ${deptList[0]}`}{deptList[1] && `, ${deptList[1]}`}{deptList[2] && `, ${deptList[2]}...`}</p>
        </div>
      </li>
  )
}

export default CollectionTile