import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import "./_ArtworkDetails.scss"
import chair from "../../assets/flw-chair.png"


function ArtworkDetail() {
  const [collection, setCollection] = useState("add to collection")
  const { objectID } = useParams()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentImg, setCurrentImg] = useState("")

  const [artworkDetails, setArtworkDetails] = useState({})
  const { additionalImages, artistName, artistURL, classification, country, culture, creditLine, department, geographyType, imageLarge, imageSmall, medium, objectDate, objectName, metURL, period, region } = artworkDetails

  useEffect(() => {
    getArtworkDetails()
  }, [])

  const getArtworkDetails = async () => {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    try {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        const data = await response.json()
        setArtworkDetails({
          additionalImages: data.additionalImages,
          artistName: data.artistDisplayName,
          artistURL: data.artistWikidata_URL,
          classification: data.classification,
          country: data.country,
          culture: data.culture,
          creditLine: data.creditLine,
          department: data.department,
          geographyType: data.geographyType,
          // imageLarge: data.primaryImage,
          imageSmall: data.primaryImageSmall,
          medium: data.medium,
          objectDate: data.objectDate,
          objectName: data.objectName,
          metURL: data.objectURL,
          period: data.period,
          region: data.region
        })
        setCurrentImg(data.primaryImage)
        setIsLoading(false)

        console.log(artworkDetails)
      }
    } catch (error) {
      setError(error)
    }
  }

  const togglePhoto = newURL => {
    const targetIndex = additionalImages.indexOf(newURL)
    additionalImages.splice(targetIndex, 1, currentImg)
    setCurrentImg(newURL)
  }

  const addlPhotoButtons = !isLoading &&
    additionalImages.map(url => (
      <button
        className="artwork__right__img-controls__button"
        onClick={() => togglePhoto(url)}
      >
        <img
          className="artwork__right__img-controls__button__img"
          src={url}
        />
      </button>
    ))

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
          <p className="artwork__left__saved-msg">
            this piece is saved in your collection "Early FLW"
          </p>
          <h3 className="artwork__left__title">{objectName}</h3>
          <p className="artwork__left__date">{objectDate}</p>
          <p className="artwork__left__artist">
            {artistName &&
              <a
                className="artwork__left__artist__link"
                href={artistURL}
              >{artistName}</a>}
            {culture}
          </p>
          <table>
            <tbody>
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
            <label
              className="artwork__left__collection__label"
              htmlFor="selected-collection"
            >add to collection:</label>
            <select
              className="artwork__left__collection__select"
              id="selected-collection"
              value={collection}
              onChange={e => setCollection(e.target.value)}
              required={true}
            >
              <option>select</option>
              <option>My Collection 1</option>
              <option>My Collection 2</option>
              <option>My Collection 3</option>
            </select>
            <button
              className="artwork__left__collection__button"
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