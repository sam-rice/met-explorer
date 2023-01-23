import { useState } from "react"

import "./_ArtworkAddInterface.scss"

const ArtworkAddInterface = ({ alertSuccess, handleDispatch, collections, relatedCollections }) => {
  const [selectedCollection, setSelectedCollection] = useState("")

  const handleSubmit = () => {
    if (!selectedCollection) return
    const targetCollection = collections.find(collection => collection.name === selectedCollection)
    handleDispatch(targetCollection.id)
    setSelectedCollection("")
    alertSuccess()
  }

  const collectionOptions = collections.filter(collection => {
    return relatedCollections.every(related => related.id !== collection.id)
  })
    .map(collection => (
      <option
        value={collection.name}
        key={collection.id}
        data-cy={`option-${collection.id}`}
      >{collection.name}</option>
    ))

  return (
    <div className="add-interface">
      <label
        className="add-interface__label"
        htmlFor="selected-collection"
      >add to collection:</label>
      <select
        className="add-interface__select"
        id="selected-collection"
        value={selectedCollection}
        onChange={e => setSelectedCollection(e.target.value)}
        required={true}
        data-cy="add-collection-select"
      >
        <option value="add to collection">add to collection</option>
        {collectionOptions}
      </select>
      <button
        className="add-interface__button"
        onClick={handleSubmit}
        data-cy="add-collection-submit"
      >add</button>
    </div>
  )
}

export default ArtworkAddInterface