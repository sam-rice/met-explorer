import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
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
    window.scrollTo({ top: 0 })
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
      data-cy="previously-saved-message"
    >
      this piece is saved in your collection: {prevSavedString}
    </motion.p>

  const formattedArtistName = !!artistURL ?
    <a
      className="artwork__left__artist__wiki-link"
      href={artistURL}
      data-cy="object-artist-wiki"
    >{artistName}
    </a> :
    <span className="artwork__left__artist__no-wiki-link">{artistName}</span>

  const artistSearchPath = `/search?query=${artistName?.replace(/ /g, "+")}&type=artist&dept=all&page=1`

  const addlPhotoButtons = !isLoading &&
    additionalImages.reduce((acc, url, i) => {
      if (i < 5) {
        acc.push(
          <button
            className="artwork__right__img-controls__button"
            onClick={() => togglePhoto(url)}
            key={i + 1}
          >
            <img
              className="artwork__right__img-controls__button__img"
              src={url}
              data-cy={`image-tile-${i + 1}`}
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
          data-cy="directory-department"
        >{department}</span>
        {
          !!artistName &&
          <span
            className="artwork-detail-link"
            data-cy="directory-artist"
          > / {artistName}
          </span>
        }
      </span>
      <section className="artwork">
        <div className="artwork__left">
          {!!relatedCollections[0] && prevSavedMessage}
          <h3
            className="artwork__left__title"
            data-cy="object-title"
          >{objectName}
            <AnimatePresence
              initial={false}
              mode="wait"
            >
              {
                showSuccess &&
                <div className="added-alert">
                  <motion.span
                    className="added-alert__label"
                    exit={{ opacity: 0 }}
                    key={"p"}
                  >
                    added
                  </motion.span>
                  <motion.img
                    className="added-alert__img"
                    src={success}
                    exit={{ opacity: 0 }}
                    key={"img"}
                  />
                </div>
              }
            </AnimatePresence>
          </h3>
          <p
            className="artwork__left__date"
            data-cy="object-date"
          >{objectDate}</p>
          <p
            className="artwork__left__artist"
          >
            {!!artistName && formattedArtistName}
            {culture}
          </p>
          <table
            className="artwork__left__table"
          >
            <tbody>
              {
                description?.toLowerCase() !== objectName?.toLowerCase() &&
                <tr>
                  <td className="artwork__left__table__key">description:</td>
                  <td data-cy="table-value-1">{description}</td>
                </tr>
              }
              <tr>
                <td>department:</td>
                <td data-cy="table-value-2">{department}</td>
              </tr>
              {
                !!region &&
                <tr>
                  <td>geography:</td>
                  <td data-cy="table-value-3">{`${geographyType} ${region}, ${country}`}</td>
                </tr>
              }
              {
                !!period &&
                <tr>
                  <td>period:</td>
                  <td data-cy="table-value-4">{period}</td>
                </tr>
              }
              {
                !!classification &&
                <tr>
                  <td>classification:</td>
                  <td data-cy="table-value-5">{classification}</td>
                </tr>
              }
              <tr>
                <td>medium:</td>
                <td data-cy="table-value-6">{medium}</td>
              </tr>
              <tr>
                <td>credit line:</td>
                <td data-cy="table-value-7">{creditLine}</td>
              </tr>
            </tbody>
          </table>
          {
            !!artistName &&
            <p>view more pieces from <Link
              to={artistSearchPath}
              data-cy="artist-search-link"
            >{artistName}</Link>
            </p>
          }
          <p className="artwork__left__met-link">
            view at <a
              href={metURL}
              data-cy="object-met-link"
            >metmuseum.org</a>
          </p>
          <div className="artwork__left__collection">
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
              data-cy="add-collection-select"
            >
              <option value="add to collection">add to collection</option>
              {collectionOptions}
            </select>
            <button
              className="artwork__left__collection__button"
              onClick={handleSubmit}
              data-cy="add-collection-submit"
            >add</button>
          </div>
        </div>
        <div className="artwork__right">
          <div className="artwork__right__mat">
            {
              !!currentImg &&
              <img
                className="artwork__right__mat__img"
                src={currentImg}
                alt={`${objectName}${artistName && ` by ${artistName}`}`}
                data-cy="object-image"
              />
            }
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