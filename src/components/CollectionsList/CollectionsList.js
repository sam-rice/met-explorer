import React from "react"

import "./_CollectionsList.scss"
import CollectionTile from "../CollectionTile/CollectionTile"

function Collections() {
  return (
    <section className="collections">
      <h3 className="collections__header">5 collections</h3>
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