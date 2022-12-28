import React, { useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateNote } from "../../actions"

import "./_SavedPieceTile.scss"
import fallbackImg from "../../assets/fallback.png"

function SavedPieceTile({ collectionID, objectID }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { artistName, artistID, department, title, culture, objectEndDate, imageSmall, userNotes } = useSelector(({ collections }) => {
    const targetCollection = collections.find(collection => collection.id == collectionID)
    return targetCollection.pieces.find(piece => piece.objectID == objectID)
  })

  const goToArtwork = useCallback(e => {
    const targetIsTile = !["TEXTAREA", "BUTTON", "A"].includes(e.target.nodeName)
    if (targetIsTile) {
      navigate(`/explore/${objectID}`, { replace: true })
      //remove replace: true ??????????
    }
  }, [navigate])

  const handleTextInput = (text) => {
    console.log("here")
    dispatch(updateNote(text, collectionID, objectID))
  }

  const removeFromCollection = () => console.log("yeah yeah")

  const artistSearchPath = `/search/${artistName.replace(/ /g, "+")}`
  // make link search for artist name or take to artist page via artistID variable?

  return (
    <li className="piece" onClick={e => goToArtwork(e)}>
      <div className="piece__left">
        <div className="img-container">
          <img className="img-container__img" src={imageSmall ? imageSmall : fallbackImg} />
        </div>
        <div className="piece__left__details">
          <div className="details-top">
            <h4 className="details-top__title">{title}</h4>
            <p className="detail-rows">ca. {objectEndDate}</p>
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