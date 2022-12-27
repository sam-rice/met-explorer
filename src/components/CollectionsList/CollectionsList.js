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
  const collections = useSelector(({collections}) => collections)

  const dispatch = useDispatch()
  ReactModal.setAppElement("#root")

  const handleModal = isOpen => setModalOpen(isOpen)

  const handleSubmit = () => {
    dispatch(createCollection(name, Date.now()))
  }

  const collectionTiles = collections.map(collection => <CollectionTile name={collection.name} id={collection.id}/>)

  const collectionsList = collectionTiles.length ? collectionTiles : <h3>no collections yet</h3>

  return (
    <section className="collections">
      <div className="collections__header">
        <h3 className="collections__header__count">5 collections</h3>
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