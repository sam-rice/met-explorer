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
      navigate(`/explore/${objectID}`, { replace: true })
      //remove replace: true ??????????
    }
  }, [navigate])

  const handleTextInput = text => dispatch(updateNote(text, collectionID, objectID))

  const removeFromCollection = () => dispatch(deletePiece(collectionID, objectID))

  const artistSearchPath = `/search/${artistName.replace(/ /g, "+")}`

  return (
    <li className="piece" onClick={e => goToArtwork(e)}>
      <div className="piece__left">
        <div className="img-container">
          <img className="img-container__img" src={imageSmall ? imageSmall : fallbackImg} />
        </div>
        <div className="piece__left__details">
          <div className="details-top">
            <h4 className="details-top__title">{objectName}</h4>
            <p className="detail-rows">ca. {objectDate}</p>
            <p className="detail-rows">
              <Link className="details-top__artist-link" to={artistSearchPath}>{artistName}</Link>
              {culture}
            </p>
          </div>
          <p className="detail-rows">department: {department}</p>
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
            rows="6" 
            cols="40" 
            placeholder="notes..." 
          />
        </div>
        <button 
          className="piece__right__button"
          onClick={removeFromCollection}
        />
      </div>
    </li>
  )
}

export default SavedPieceTile