import React, { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"

import "./_SavedPieceTile.scss"
import chair from "../../assets/flw-chair.png"

function SavedPieceTile() {
  const [notes, setNotes] = useState("")
  const navigate = useNavigate()

  const goToArtwork = useCallback(e => {
    if (e.target.type !== "textarea" && e.target.type !== "submit") {
      navigate("/artwork/artworkID", { replace: true })
    }
  }, [navigate])

  const removeCollection = () => console.log("yeah yeah")

  return (
    <li className="piece" onClick={e => goToArtwork(e)}>
      <div className="piece__left">
        <div className="img-container">
          <img className="img-container__img" src={chair} />
        </div>
        <div className="piece__left__details">
          <div className="details-top">
            <h4 className="details-top__title">Armchair</h4>
            <p className="detail-rows">ca. 1902-3</p>
            <p className="detail-rows">
              <Link className="details-top__artist-link" to="/search/franklloydwright">Frank Lloyd Wright</Link>
              American
            </p>
          </div>
          <p className="detail-rows">department: American Decorative Arts</p>
        </div>
      </div>
      <div className="piece__right">
        <div className="piece__right__notes-container">
          <label htmlFor="notes">notes:</label>
          <textarea
            id="notes" 
            name="notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            maxLength={400}
            rows="6" 
            cols="40" 
            placeholder="notes..." 
          />
        </div>
        <button 
          className="piece__right__button"
          onClick={removeCollection}
        />
      </div>
    </li>
  )
}

export default SavedPieceTile