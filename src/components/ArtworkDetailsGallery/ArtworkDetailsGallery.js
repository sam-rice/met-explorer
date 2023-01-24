import { useState } from "react"

import "./_ArtworkDetailsGallery.scss"
import fallbackIMG from "../../assets/fallback.png"

const ArtworkDetailsGallery = ({ primaryImage, additionalImages, objectName, artistName }) => {
  const [currentImg, setCurrentImg] = useState(primaryImage || fallbackIMG)
  const [images, setImages] = useState(additionalImages)

  const togglePhoto = newURL => {
    const newImages = [...images]
    const targetIndex = newImages.indexOf(newURL)
    newImages.splice(targetIndex, 1, currentImg)
    setImages(newImages)
    setCurrentImg(newURL)
  }

  const addlPhotoButtons = images.reduce((acc, url, i) => {
    if (i < 5) {
      acc.push(
        <button
          className="gallery-lower__button"
          onClick={() => togglePhoto(url)}
          key={i + 1}
          data-cy="image-button"
        >
          <img
            className="gallery-lower__button__img"
            src={url}
            data-cy={`image-tile-${i + 1}`}
          />
        </button>
      )
    }
    return acc
  }, [])

  return (
    <>
      <div className="gallery-upper">
        {
          !!currentImg &&
          <img
            className="gallery-upper__img"
            src={currentImg}
            alt={`${objectName}${artistName && ` by ${artistName}`}`}
            data-cy="object-image"
          />
        }
      </div>
      <div className="gallery-lower">
        {addlPhotoButtons}
      </div>
    </>
  )
}

export default ArtworkDetailsGallery