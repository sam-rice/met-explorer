import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { addToCollection } from "../../actions"
import { cleanDetails } from "../../utilities/cleaners"
import { getArtworkDetails } from "../../utilities/apiCalls"

import "./_ArtworkDetails.scss"
import fallbackIMG from "../../assets/fallback.png"
import SuccessAnimation from "../SuccessAnimation/SuccessAnimation"
import ArtworkDetailsGallery from "../ArtworkDetailsGallery/ArtworkDetailsGallery"

function ArtworkDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const collections = useSelector(({ collections }) => collections)
  const { objectID } = useParams()

  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCollection, setSelectedCollection] = useState("")
  // const [currentImg, setCurrentImg] = useState("")
  const [artworkData, setArtworkData] = useState({})

  const { additionalImages, artistName, artistURL, classification, country, culture, creditLine, department, description, geographyType, primaryImage, imageSmall, medium, objectDate, objectName, metURL, period, region } = artworkData

  useEffect(() => {
    getArtworkData()
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    if (!error) return
    navigate("/error")
  }, [error])

  const getArtworkData = async () => {
    try {
      const response = await getArtworkDetails(objectID)
      if (!response.ok) throw Error(response.statusText)
      const details = await response.json()
      setArtworkData(cleanDetails(details))
      // setCurrentImg(details.primaryImage ? details.primaryImage : fallbackIMG)
      setIsLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  const relatedCollections = useMemo(() => collections.reduce((acc, collection) => {
    const objectIsSaved = collection.pieces.some(piece => piece.objectID == objectID)
    if (objectIsSaved) {
      acc.push({
        id: collection.id,
        name: collection.name
      })
    }
    return acc
  }, []),
    [collections])

  // const togglePhoto = newURL => {
    // const targetIndex = additionalImages.indexOf(newURL)
    // additionalImages.splice(targetIndex, 1, currentImg)
  //   setCurrentImg(newURL)
  // }

  const handleSubmit = () => {
    if (!selectedCollection) return
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

  const alertSuccess = () => {
    setShowSuccess(true)
    setTimeout(setShowSuccess, 3000, false)
  }

  const removeOption = targetCollectionID => {
    const targetIndex = relatedCollections.findIndex(collection => collection.id == targetCollectionID)
    relatedCollections.splice(targetIndex, 1)
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

  const artistElement = !!artistURL ?
    <a
      className="artwork__left__artist__wiki-link"
      href={artistURL}
      data-cy="object-artist-wiki"
    >{artistName}
    </a> :
    <span className="artwork__left__artist__no-wiki-link" data-cy="object-artist-no-wiki">{artistName}</span>

  const artistSearchPath = `/search?query=${artistName?.replace(/ /g, "+")}&type=artist&dept=all&page=1`

  // const addlPhotoButtons = !isLoading &&
  //   additionalImages.reduce((acc, url, i) => {
  //     if (i < 5) {
  //       acc.push(
  //         <button
  //           className="artwork__right__img-controls__button"
  //           onClick={() => togglePhoto(url)}
  //           key={i + 1}
  //           data-cy="image-button"
  //         >
  //           <img
  //             className="artwork__right__img-controls__button__img"
  //             src={url}
  //             data-cy={`image-tile-${i + 1}`}
  //           />
  //         </button>
  //       )
  //     }
  //     return acc
  //   }, [])

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
          <SuccessAnimation showSuccess={showSuccess} />
          </h3>
          <p
            className="artwork__left__date"
            data-cy="object-date"
          >{objectDate}</p>
          <p
            className="artwork__left__artist"
          >
            {!!artistName && artistElement}
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
          {/* <div className="artwork__right__mat">
            {
              !!currentImg &&
              <img
                className="artwork__right__mat__img"
                src={currentImg}
                alt={`${objectName}${artistName && ` by ${artistName}`}`}
                data-cy="object-image"
              />
            }
          </div> */}
          { 
            !isLoading && 
            <ArtworkDetailsGallery
              primaryImage={primaryImage}
              additionalImages={additionalImages}
              objectName={objectName}
              artistName={artistName}
            />
          }
          {/* <div className="artwork__right__img-controls">
            {addlPhotoButtons}
          </div> */}
        </div>
      </section>
    </div>
  )
}

export default ArtworkDetail