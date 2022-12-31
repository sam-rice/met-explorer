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
  const [nameExistsError, setNameExistsError] = useState(false)
  const [formError, setFormError] = useState(false)
  const dispatch = useDispatch()

  const collections = useSelector(({ collections }) => collections)

  ReactModal.setAppElement("#root")

  const showModal = () => {
    setModalOpen(true)
    setNameExistsError(false)
    setFormError(false)
    setName("")
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") handleSubmit()
  }

  const handleSubmit = () => {
    const collectionNameExists = collections.some(collection => collection.name === name)
    if (collectionNameExists) {
      setNameExistsError(true)
      setFormError(false)
      return
    }
    if (name === "") {
      setFormError(true)
      setNameExistsError(false)
      return
    }
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
            onClick={showModal}
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
          {formError && <p className="modal__form__error">*required field</p>}
          {nameExistsError && <p className="modal__form__error">*collection name already exists</p>}
        </div>
        <button
          className="modal__close-button"
          onClick={() => setModalOpen(false)}
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