import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetSearch } from "../../actions"

import "./_SearchForm.scss"
import { deptKey } from "../../utilities/global-static-data"

function SearchForm() {
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState("keyword")
  const [selectedDepartment, setselectedDepartment] = useState("optional")
  const [userError, setUserError] = useState(false)
  const searchInput = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => searchInput.current.focus(), [])

  const submitSearch = () => {
    if (query === "") {
      setUserError(true)
      return
    }
    dispatch(resetSearch())
    const submittedType = searchType === "artist name" ? "artist" : "keyword"
    const submittedDept = selectedDepartment !== "optional" ? deptKey[selectedDepartment] : "all"
    navigate(`/search?query=${query}&type=${submittedType}&dept=${submittedDept}&page=1`)
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") submitSearch()
  }

  return (
    <section className="search">
      <div className="search__input-container">
        <label
          className="search__input-container__label"
          htmlFor="search-artwork"
        >search:</label>
        <input
          className="search__input-container__input"
          id="search-artwork"
          name="search-artwork"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
          placeholder="search..."
          required={true}
          ref={searchInput}
          data-cy="search-input"
        />
        {
          userError && 
          <p
            className="search__input-container__error"
            data-cy="input-error"
          >*required field</p>
        }
      </div>
      <div className="search__type-container">
        <label
          htmlFor="search-type-select"
        >search by:</label>
        <select
          className="search__type-container__select"
          id="search-type-select"
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
          required={true}
          data-cy="type-select"
        >
          <option value="keyword">keyword</option>
          <option value="artist name">artist name</option>
        </select>
      </div>
      <div className="search__dept-container">
        <label
          htmlFor="dept-select"
        >in department:</label>
        <select
          className="search__dept-container__select"
          id="dept-select"
          value={selectedDepartment}
          onChange={e => setselectedDepartment(e.target.value)}
          data-cy="dept-select"
        >
          <option value="optional">{"(optional)"}</option>
          <option value="American Decorative Arts">American Decorative Arts</option>
          <option value="Ancient Near Eastern Art">Ancient Near Eastern Art</option>
          <option value="Arms and Armor">Arms and Armor</option>
          <option value="Arts of Africa, Oceania, and the Americas">Arts of Africa, Oceania, and the Americas</option>
          <option value="Asian Art">Asian Art</option>
          <option value="The Cloisters">The Cloisters</option>
          <option value="The Costume Institute">The Costume Institute</option>
          <option value="Drawings and Prints">Drawings and Prints</option>
          <option value="Egyptian Art">Egyptian Art</option>
          <option value="European Paintings">European Paintings</option>
          <option value="European Sculpture and Decorative Arts">European Sculpture and Decorative Arts</option>
          <option value="Greek and Roman Art">Greek and Roman Art</option>
          <option value="Islamic Art">Islamic Art</option>
          <option value="The Robert Lehman Collection">The Robert Lehman Collection</option>
          <option value="The Libraries">The Libraries</option>
          <option value="Medieval Art">Medieval Art</option>
          <option value="Musical Instruments">Musical Instruments</option>
          <option value="Photographs">Photographs</option>
          <option value="Modern Art">Modern Art</option>
        </select>
      </div>
      <button
        className="search__button"
        onClick={submitSearch}
        data-cy="submit-search"
      >search
      </button>
    </section>
  )
}

export default SearchForm