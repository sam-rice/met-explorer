import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import "./_ArtworkDetails.scss"
import chair from "../../assets/flw-chair.png"


function ArtworkDetail() {
  const [collection, setCollection] = useState("add to collection")
  const { objectID } = useParams()
  const [artworkDetails, setArtworkDetails] = useState({})
  const [error, setError] = useState("")

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
          country: data.country,
          culture: data.culture, 
          creditLine: data.creditLine,
          department: data.department, 
          geographyType: data.geographyType,
          imageLarge: data.primaryImage, 
          imageSmall: data.primaryImageSmall, 
          medium: data.medium,
          objectDate: data.objectDate,
          objectName: data.objectName,
          metURL: data.objectURL,
          period: data.period,
          region: data.region,
          title: data.title, 
        })
        console.log(artworkDetails)
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className="artwork-view-parent">
      <span className="artwork-directory">
        <Link
          className="artwork-detail-link"
          to="/search/deptQuery"
        >The American Wing</Link>
        {" / "}
        <Link
          className="artwork-detail-link"
          to="artist url here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        >Frank Lloyd Wright</Link>
      </span>
      <section className="artwork">
        <div className="artwork__left">
          <p className="artwork__left__saved-msg">
            this piece is saved in your collection "Early FLW"
          </p>
          <h3 className="artwork__left__title">Armchair</h3>
          <p className="artwork__left__date">ca. 1902-3</p>
          <p className="artwork__left__artist">
            <Link
              className="artwork__left__artist__link"
              to="/search/artistQuery"
            >Frank Lloyd Wright</Link>
            American
          </p>
          <article className="artwork__left__article">
            {"This set of four armchairs (1972.60.4-.7) in dark-stained oak was designed for the Littles’ first home in Peoria, Illinois, and moved with the family, eventually ending up in the living room of their new summer home. Unlike Wright's later (1912–14) furnishings in the room, these chairs include decorative applied banding, and, on each leg, stylized capitals and bases. The chairs’ cushions are covered with their original wool fabric."}
          </article>
          <p className="artwork__left__dept">
            department: American Decorative Arts
          </p>
          <div className="artwork__left__collection">
            <label
              className="artwork__left__collection__label"
              htmlFor="selected-collection"
            >search by:</label>
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
              src={chair}
            />
          </div>
          <div className="artwork__right__img-controls">
            <button className="artwork__right__img-controls__button">
              <img className="artwork__right__img-controls__button__img" src={chair}
              />
            </button>
            <button className="artwork__right__img-controls__button">
              <img className="artwork__right__img-controls__button__img" src={chair}
              />
            </button>
            <button className="artwork__right__img-controls__button">
              <img className="artwork__right__img-controls__button__img" src={chair}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArtworkDetail