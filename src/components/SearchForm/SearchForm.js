import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./_SearchForm.scss"

function SearchForm() {
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState("select")
  const [selectedDepartment, setselectedDepartment] = useState("(optional)")

  const navigate = useNavigate()

  const submitSearch = () => {
    if (query === "" || searchType === "(required)") {
      displayError()
      return
    }
    const deptKey = {
      "American Decorative Arts": 1,
      "Ancient Near Eastern Art": 3,
      "Arms and Armor": 4,
      "Arts of Africa, Oceania, and the Americas": 5,
      "Asian Art": 6,
      "The Cloisters": 7,
      "The Costume Institute": 8,
      "Drawings and Prints": 9,
      "Egyptian Art": 10,
      "European Paintings": 11,
      "European Sculpture and Decorative Arts": 12,
      "Greek and Roman Art": 13,
      "Islamic Art": 14,
      "The Robert Lehman Collection": 15,
      "The Libraries": 16,
      "Medieval Art": 17,
      "Musical Instruments": 18,
      "Photographs": 19,
      "Modern Art": 21
    }
    const submittedType = searchType === "artist name" ? "artist" : "artwork"
    const submittedQuery = query.replace(/ /g, "+")
    const submittedDept = selectedDepartment !== "(optional)" ? deptKey[selectedDepartment] : "all"
    navigate(`${submittedType}/${submittedQuery}/${submittedDept}`)
  }

  const displayError = () => {
    console.log("form error")
    //replace replace replace replace
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
          placeholder="search..."
          required={true}
        />
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
        >
          <option>{`(required)`}</option>
          <option>artwork name</option>
          <option>artist name</option>
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
        >
          <option>{"(optional)"}</option>
          <option>American Decorative Arts</option>
          <option>Ancient Near Eastern Art</option>
          <option>Arms and Armor</option>
          <option>Arts of Africa, Oceania, and the Americas</option>
          <option>Asian Art</option>
          <option>The Cloisters</option>
          <option>The Costume Institute</option>
          <option>Drawings and Prints</option>
          <option>Egyptian Art</option>
          <option>European Paintings</option>
          <option>European Sculpture and Decorative Arts</option>
          <option>Greek and Roman Art</option>
          <option>Islamic Art</option>
          <option>The Robert Lehman Collection</option>
          <option>The Libraries</option>
          <option>Medieval Art</option>
          <option>Musical Instruments</option>
          <option>Photographs</option>
          <option>Modern Art</option>
        </select>
      </div>
      <button
        className="search__button"
        onClick={submitSearch}
      >search
      </button>
    </section>
  )
}

export default SearchForm