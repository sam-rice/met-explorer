import { useState, useMemo, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCollection } from "../../actions"

import "./_CollectionsList.scss"
import CollectionTile from "../CollectionTile/CollectionTile"
import NewCollectionModal from "../NewCollectionModal/NewCollectionModal"

function CollectionsList() {
  const [modalOpen, setModalOpen] = useState(false)
  const collections = useSelector(({ collections }) => collections)
  const dispatch = useDispatch()

  const closeModal = () => setModalOpen(false)

  const submitCollection = name => {
    dispatch(createCollection(name))
    setModalOpen(false)
  }

  const collectionTiles = useMemo(() => collections.map((collection) => {
    const thumbnailURL = collection.pieces[0]?.imageSmall

    const deptList = collection.pieces.reduce((acc, piece) => {
      if (acc.length < 3 && !acc.includes(piece.department)) {
        acc.push(piece.department)
      }
      return acc
    }, [])

    return <CollectionTile
      name={collection.name}
      id={collection.id}
      key={collection.id}
      count={collection.pieces.length}
      deptList={deptList}
      thumbnail={thumbnailURL}
    />
  }), [collections])

  const collectionsList = collectionTiles.length ?
    collectionTiles :
    <h3 data-cy="no-collections">no collections yet</h3>
  const collectionsCount = `${collections.length} collection${collections.length === 1 ? "" : "s"}`

  return (
    <section className="collections">
      <div className="collections__header">
        <h3
          className="collections__header__count"
          data-cy="collections-count"
        >{collectionsCount}</h3>
        <div className="collections__header__add">
          <p className="add-button-label">new collection</p>
          <button
            className="add-button"
            onClick={() => setModalOpen(true)}
            data-cy="modal-open"
          />
        </div>
      </div>
      <NewCollectionModal
        isOpen={modalOpen}
        submitCollection={submitCollection}
        closeModal={closeModal}
        collections={collections}
      />
      <ul className="collections__list">
        {collectionsList}
      </ul>
    </section>
  )
}

export default CollectionsList