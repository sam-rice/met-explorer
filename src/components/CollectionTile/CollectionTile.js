import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteCollection } from "../../actions"

import "./_CollectionTile.scss"
import fallbackIMG from "../../assets/fallback.png"

function CollectionTile({ name, id, count, deptList, thumbnail }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToCollection = e => {
    if (e.target.type === "submit") {
      removeCollection()
    } else {
      navigate(`/collections/${id}`)
    }
  }

  const removeCollection = () => {
    dispatch(deleteCollection(id))
  }

  const pieceCount = `${count} piece${count === 1 ? "" : "s"}`

  const displayedThumbnail = thumbnail ? thumbnail : fallbackIMG

  const dept1 = !!deptList[0] ? `departments: ${deptList[0]}` : ""
  const dept2 = !!deptList[1] ? `, ${deptList[1]}` : ""
  const dept3 = !!deptList[2] ? `, ${deptList[2]}...` : ""
  const displayedDeptList = `${dept1}${dept2}${dept3}`

  return (
    <li
      className="collection"
      onClick={e => goToCollection(e)}
      data-cy={`collection-${id}`}
    >
      <div className="collection__left">
        {
          count !== 0 &&
          <div className="collection__left__img-container">
            <img className="collection__left__img-container__img" src={displayedThumbnail} />
          </div>
        }
        <h4 className="collection__left__title">{name}</h4>
      </div>
      <div className="collection__details">
        <p
          className="collection__details__row"
          data-cy="saved-count"
        >{pieceCount}</p>
        <div className="collection__details__button-container">
          <button
            data-cy="delete-button"
          />
        </div>
        <p
          className="collection__details__row"
          data-cy="department-list"
        >{displayedDeptList}</p>
      </div>
    </li>
  )
}

export default CollectionTile