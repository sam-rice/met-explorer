import React from "react"

import "./_CollectionView.scss"
import SavedPieceTile from "../SavedPieceTile/SavedPieceTile"

function CollectionView() {
  return (
    <section className="pieces">
      <div className="pieces__header">
        <div className="pieces__header__left">
          <h3 className="pieces__header__left__collection-name">Early FLW</h3>
          <p>My Collections</p>
        </div>
        <p className="gray--text">12 pieces</p>
      </div>
      <ul className="pieces__list">
        <SavedPieceTile />
        <SavedPieceTile />
        <SavedPieceTile />
        <SavedPieceTile />
      </ul>
    </section>
  )
}

export default CollectionView