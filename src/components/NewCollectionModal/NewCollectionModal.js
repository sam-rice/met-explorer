import { useState } from "react"
import Modal from "react-modal"
import ReactModal from "react-modal"

import "./_NewCollectionModal.scss"

const NewCollectionModal = ({ isOpen, collections, submitCollection, closeModal }) => {
  const [name, setName] = useState("")
  const [nameExistsError, setNameExistsError] = useState(false)
  const [formError, setFormError] = useState(false)

  ReactModal.setAppElement("#root")

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
    submitCollection(name)
  }

  const handleClose = () => {
    setNameExistsError(false)
    setFormError(false)
    setName("")
    closeModal()
  }

  return (
    <Modal
      className="modal"
      isOpen={isOpen}
      closeTimeoutMS={400}
      onRequestClose={handleClose}
      contentLabel="modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldReturnFocusAfterClose={true}
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
          data-cy="modal-input"
        />
        <button
          className="modal__form__button"
          onClick={handleSubmit}
          data-cy="modal-submit"
        >create
        </button>
        {formError && <p className="modal__form__error" data-cy="required-error">*required field</p>}
        {nameExistsError && <p className="modal__form__error" data-cy="existing-name-error">*collection name already exists</p>}
      </div>
      <button
        className="modal__close-button"
        onClick={handleClose}
        data-cy="modal-close"
      >cancel
      </button>
    </Modal>
  )
}

export default NewCollectionModal