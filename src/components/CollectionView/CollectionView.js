import React from "react"

import "./_CollectionView.scss"

function CollectionView() {
  return (
    <section className="pieces">
      <div className="pieces__header">
        <h3 className="pieces__header__collection-name">Early FLW</h3>
        <p>My Collections</p>
      </div>
      <ul className="pieces__list">
        {/* <SavedPieceTile /> */}
      </ul>
    </section>
  )
}

export default CollectionView