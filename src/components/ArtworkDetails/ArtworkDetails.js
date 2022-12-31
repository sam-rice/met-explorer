import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addToCollection } from "../../actions"
import { motion, AnimatePresence } from "framer-motion"

import "./_ArtworkDetails.scss"
import fallbackIMG from "../../assets/fallback.png"
import success from "../../assets/success.png"

function ArtworkDetail() {
  const dispatch = useDispatch()
  const collections = useSelector(({ collections }) => collections)
  const { objectID } = useParams()

  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCollection, setSelectedCollection] = useState("")
  const [currentImg, setCurrentImg] = useState("")
  const [artworkData, setArtworkData] = useState({})

  const { additionalImages, artistName, artistURL, classification, country, culture, creditLine, department, description, geographyType, imageSmall, medium, objectDate, objectName, metURL, period, region } = artworkData

  useEffect(() => {
    getArtworkData()
  }, [])

  const getArtworkData = async () => {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    try {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        const data = await response.json()
        setArtworkData({
          additionalImages: data.additionalImages,
          artistName: data.artistDisplayName,
          artistURL: data.artistWikidata_URL,
          classification: data.classification,
          country: data.country,
          culture: data.culture,
          creditLine: data.creditLine,
          department: data.department,
          description: data.title,
          geographyType: data.geographyType,
          imageSmall: data.primaryImageSmall,
          medium: data.medium,
          objectDate: data.objectDate,
          objectName: data.objectName,
          metURL: data.objectURL,
          period: data.period,
          region: data.region
        })
        if (data.primaryImage) {
          setCurrentImg(data.primaryImage)
        } else {
          setCurrentImg(fallbackIMG)
        }
        setIsLoading(false)
      }
    } catch (error) {
      setError(error)
    }
  }

  const relatedCollections = (collections.reduce((acc, collection) => {
    if (collection.pieces.some(piece => piece.objectID == objectID)) {
      acc.push({
        id: collection.id,
        name: collection.name
      })
    }
    return acc
  }, []))

  const togglePhoto = newURL => {
    const targetIndex = additionalImages.indexOf(newURL)
    additionalImages.splice(targetIndex, 1, currentImg)
    setCurrentImg(newURL)
  }

  const handleSubmit = () => {
    if (!selectedCollection) {
      handleFormError()
      return
    }
    const targetCollection = collections.find(collection => collection.name === selectedCollection)

    dispatch(addToCollection({
      collectionID: targetCollection.id,
      artistName,
      culture,
      department,
      objectDate,
      objectID,
      objectName,
      imageSmall
    }))
    setSelectedCollection("")
    removeOption(targetCollection.id)
    alertSuccess()
  }

  const handleFormError = () => {
    console.log("error")
  }

  const alertSuccess = () => {
    console.log("success")
    setShowSuccess(true)
    setTimeout(setShowSuccess, 3000, false)
  }

  const removeOption = targetCollectionID => {
    const targetIndex = relatedCollections.findIndex(collection => collection.id == targetCollectionID)
    relatedCollections.splice(targetIndex, 1)
  }

  const collectionOptions = collections.filter(collection => {
    return relatedCollections.every(related => related.id != collection.id)
  })
    .map(collection => (
      <option
        value={collection.name}
        key={collection.id}
      >{collection.name}</option>
    ))

  const prevSavedString = relatedCollections.length > 1 ?
    `"${relatedCollections[0]?.name}" & others` :
    `"${relatedCollections[0]?.name}"`
  const prevSavedMessage =
    <motion.p 
      className="artwork__left__saved-msg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      this piece is saved in your collection: {prevSavedString}
    </motion.p>

  const formattedArtistName = artistURL ?
    <a
      className="artwork__left__artist__link"
      href={artistURL}
    >{artistName}
    </a> :
    <span className="artwork__left__artist__no-link">{artistName}</span>

  const addlPhotoButtons = !isLoading &&
    additionalImages.reduce((acc, url, i) => {
      if (i < 5) {
        acc.push(
          <button
            className="artwork__right__img-controls__button"
            onClick={() => togglePhoto(url)}
            key={i}
          >
            <img
              className="artwork__right__img-controls__button__img"
              src={url}
            />
          </button>
        )
      }
      return acc
    }, [])

  return (
    <div className="artwork-view-parent">
      <span className="artwork-directory">
        <span
          className="artwork-detail-link"
        >{department}</span>
        {artistName &&
          <span
            className="artwork-detail-link"
          > / {artistName}
          </span>}
      </span>
      <section className="artwork">
        <div className="artwork__left">
          {relatedCollections[0] && prevSavedMessage}
          <h3 className="artwork__left__title">{objectName}</h3>
          <p className="artwork__left__date">{objectDate}</p>
          <p className="artwork__left__artist">
            {artistName && formattedArtistName}
            {culture}
          </p>
          <table className="artwork__left__table">
            <tbody>
              {description?.toLowerCase() !== objectName?.toLowerCase() &&
                <tr>
                  <td className="artwork__left__table__key">description:</td>
                  <td>{description}</td>
                </tr>}
              <tr>
                <td>department:</td>
                <td>{department}</td>
              </tr>
              {region && <tr>
                <td>geography:</td>
                <td>{`${geographyType} ${region}, ${country}`}</td>
              </tr>}
              {period && <tr>
                <td>period:</td>
                <td>{period}</td>
              </tr>}
              {classification && <tr>
                <td>classification:</td>
                <td>{classification}</td>
              </tr>}
              <tr>
                <td>medium:</td>
                <td>{medium}</td>
              </tr>
              <tr>
                <td>credit line:</td>
                <td>{creditLine}</td>
              </tr>
            </tbody>
          </table>
          <p className="artwork__left__met-link">
            view at <a href={metURL}>metmuseum.org</a>
          </p>
          <div className="artwork__left__collection">
            <AnimatePresence
              initial={false}
              mode="wait"
            >
              {showSuccess &&
                <div className="artwork__left__collection__alert">
                  <motion.span
                    className="artwork__left__collection__alert__label"
                    exit={{ opacity: 0 }}
                    key={"p"}
                  >
                    added
                  </motion.span>
                  <motion.img 
                    className="artwork__left__collection__alert__img" 
                    src={success}
                    exit={{ opacity: 0 }}
                    key={"img"}
                  />
                </div>
              }
            </AnimatePresence>
            <label
              className="artwork__left__collection__label"
              htmlFor="selected-collection"
            >add to collection:</label>
            <select
              className="artwork__left__collection__select"
              id="selected-collection"
              value={selectedCollection}
              onChange={e => setSelectedCollection(e.target.value)}
              required={true}
            >
              <option value="add to collection">add to collection</option>
              {collectionOptions}
            </select>
            <button
              className="artwork__left__collection__button"
              onClick={handleSubmit}
            >add</button>
          </div>
        </div>
        <div className="artwork__right">
          <div className="artwork__right__mat">
            <img
              className="artwork__right__mat__img"
              src={currentImg}
            />
          </div>
          <div className="artwork__right__img-controls">
            {addlPhotoButtons}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArtworkDetail