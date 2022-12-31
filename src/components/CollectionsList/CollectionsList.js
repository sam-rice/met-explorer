import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCollection } from "../../actions"

import ReactModal from "react-modal"
import Modal from "react-modal"

import "./_CollectionsList.scss"
import CollectionTile from "../CollectionTile/CollectionTile"

function CollectionsList() {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState("")
  const dispatch = useDispatch()

  const collections = useSelector(({ collections }) => collections)

  ReactModal.setAppElement("#root")

  const handleModal = isOpen => setModalOpen(isOpen)

  const handleKeyDown = e => {
    if (e.key === "Enter") handleSubmit()
  }

  const handleSubmit = () => {
    dispatch(createCollection(name))
    setModalOpen(false)
    setName("")
  }

  const collectionTiles = collections.map((collection) => {
    const thumbnailURL = collection.pieces[0]?.imageSmall

    const deptList = collection.pieces.reduce((acc, piece) => {
      console.log(piece)
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
  })

  const collectionsList = collectionTiles.length ? collectionTiles : <h3>no collections yet</h3>
  const collectionsCount = `${collections.length} collection${collections.length === 1 ? "" : "s"}`

  return (
    <section className="collections">
      <div className="collections__header">
        <h3 className="collections__header__count">{collectionsCount}</h3>
        <div className="collections__header__add">
          <p className="add-button-label">new collection</p>
          <button
            className="add-button"
            onClick={() => handleModal(true)}
          />
        </div>
      </div>
      <Modal
        className="modal"
        isOpen={modalOpen}
        closeTimeoutMS={400}
        contentLabel="modal"
        autoFocus={false}
      >
        <h3>create new collection:</h3>
        <div className="modal__form">
          <label
            htmlFor="collection-name"
          >
            name:
          </label>
          <input
            className="modal__form__input"
            id="collection-name"
            name="collection name"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => handleKeyDown(e)}
            autoFocus={true}
          />
          <button
            className="modal__form__button"
            onClick={handleSubmit}
          >create
          </button>
        </div>
        <button
          className="modal__close-button"
          onClick={() => handleModal(false)}
        >cancel
        </button>
      </Modal>
      <ul className="collections__list">
        {collectionsList}
      </ul>
    </section>
  )
}

export default CollectionsList