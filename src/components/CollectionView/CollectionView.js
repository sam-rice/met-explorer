import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import "./_CollectionView.scss"
import SavedPieceTile from "../SavedPieceTile/SavedPieceTile"

function CollectionView() {
  const { collectionID } = useParams()
  const { name, pieces, id } = useSelector(({ collections }) => collections.find(collection => collection.id == collectionID))

  const savedPieceTiles = pieces.map(piece => <SavedPieceTile
    collectionID={collectionID}
    objectID={piece.objectID}
    key={piece.objectID}
  />)

  const listContent = pieces.length ? savedPieceTiles : <p>no pieces in this collection yet</p>

  return (
    <section className="pieces">
      <div className="pieces__header">
        <div className="pieces__header__left">
          <h3 className="pieces__header__left__collection-name">{name}</h3>
          <p>My Collections</p>
        </div>
        <p className="gray--text">{pieces.length} pieces</p>
      </div>
      <ul className="pieces__list">
        {listContent}
      </ul>
    </section>
  )
}

export default CollectionView