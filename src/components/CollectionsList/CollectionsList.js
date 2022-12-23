import React, { useState } from "react"
import ReactModal from "react-modal"
import Modal from "react-modal"

import "./_CollectionsList.scss"
import CollectionTile from "../CollectionTile/CollectionTile"

function Collections() {
  const [modalOpen, setModalOpen] = useState(false)

  ReactModal.setAppElement("#root")

  const handleModal = isOpen => setModalOpen(isOpen)

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
          />
          <button
            className="modal__form__button"
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
        <CollectionTile />
        <CollectionTile />
        <CollectionTile />
        <CollectionTile />
        <CollectionTile />
      </ul>
    </section>
  )
}

export default Collections