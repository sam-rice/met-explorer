import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import "./_CollectionView.scss"
import SavedPieceTile from "../SavedPieceTile/SavedPieceTile"

function CollectionView() {
  const { collectionID } = useParams()
  const { name, pieces } = useSelector(({ collections }) => collections.find(collection => collection.id == collectionID))

  const savedPieceTiles = pieces.map(piece => <SavedPieceTile
    collectionID={collectionID}
    objectID={piece.objectID}
    key={piece.objectID}
    data={piece}
  />)

  const listContent = pieces.length ? savedPieceTiles : <p data-cy="no-pieces-message">no pieces in "{name}" yet</p>

  return (
    <section className="pieces">
      <div className="pieces__header">
        <div className="pieces__header__left">
          <h3 
            className="pieces__header__left__collection-name"
            data-cy="name"
          >{name}</h3>
          <p>My Collections</p>
        </div>
        <p 
          className="gray--text"
          data-cy="piece-count"
        >{pieces.length} piece{pieces.length !== 1 && "s"}</p>
      </div>
      <ul 
        className="pieces__list"
        data-cy="pieces-list"
      >
        {listContent}
      </ul>
    </section>
  )
}

export default CollectionView