import React, { useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateNote, deletePiece } from "../../actions"

import "./_SavedPieceTile.scss"
import fallbackImg from "../../assets/fallback.png"

function SavedPieceTile({ collectionID, data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { artistName, department, objectName, culture, objectDate, imageSmall, userNotes, objectID } = data

  const goToArtwork = useCallback(e => {
    const targetIsTile = !["TEXTAREA", "BUTTON", "A"].includes(e.target.nodeName)
    if (targetIsTile) {
      navigate(`/explore/${objectID}`)
    }
  }, [navigate])

  const handleTextInput = text => dispatch(updateNote(text, collectionID, objectID))

  const removeFromCollection = () => dispatch(deletePiece(collectionID, objectID))

  const artistSearchPath = `/search?query=${artistName.replace(/ /g, "+")}&type=artist&dept=all&page=1`

  return (
    <li 
      className="piece" 
      onClick={e => goToArtwork(e)}
      data-cy={`saved-piece-${objectID}`}
    >
      <div className="piece__left">
        <div className="img-container">
          <img className="img-container__img" src={!!imageSmall ? imageSmall : fallbackImg} />
        </div>
        <div className="piece__left__details">
          <div className="details-top">
            <h4 
              className="details-top__title"
              data-cy="object-name"
            >{objectName}</h4>
            <p 
              className="detail-rows"
              data-cy="object-date"
            >ca. {objectDate}</p>
            <p className="detail-rows">
              {
                !!artistName && 
                <Link 
                  className="details-top__artist-link" 
                  to={artistSearchPath}
                  data-cy="artist-link"
                >{artistName}</Link>
              }
              <span data-cy="object-culture">
              {culture}</span>
            </p>
          </div>
          <p 
            className="detail-rows"
            data-cy="object-department"
          >department: {department}</p>
        </div>
      </div>
      <div className="piece__right">
        <div className="piece__right__notes-container">
          <label htmlFor="notes">notes:</label>
          <textarea
            id="notes" 
            name="notes"
            value={userNotes}
            onChange={e => handleTextInput(e.target.value)}
            maxLength={400}
            placeholder="notes..."
            data-cy="user-notes"
          />
        </div>
        <div className="piece__right__button-container">
          <button 
            onClick={removeFromCollection}
            data-cy="delete-button"
          />
        </div>
      </div>
    </li>
  )
}

export default SavedPieceTile