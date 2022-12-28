import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchResults } from "../../actions"

import "./_SearchResultsView.scss"
import SearchResultTile from "../SearchResultTile/SearchResultTile"

function SearchResultsView() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query")
  const type = searchParams.get("type")
  const dept = searchParams.get("dept")
  const pageNum = Number(searchParams.get("page"))

  useEffect(() => {
    //next, format fetch URL and make action/reducer dynamic
    console.log("INITIAL", query, type, dept, pageNum)
    dispatch(fetchResults())
  }, [])

  useEffect(() => {
    //increment/decrement search result page num
    console.log("ON PAGE CHANGE", query, type, dept, pageNum)
  }, [pageNum])

  const handlePageNav = (bool) => {
    setSearchParams({ 
      query: query, 
      type: type, 
      dept: dept, 
      page: bool ? pageNum + 1 : pageNum - 1
    })
  }

  const backButtonClassList = pageNum !== 1 ? "results__results-controls__nav__back" : "results__results-controls__nav__back back--disabled"

  return (
    <section className="results">
      <div className="results__header">
        <div className="results__header__left">
          <h3 className="results__header__left__search-params">
            336 results for "tolouse lautrec"
          </h3>
          <p className="results__header__left__dept">
            in European Paintings
          </p>
        </div>
        <p className="gray--text">
          displaying 1-25 of 336 results
        </p>
      </div>
      <ul className="results__list">
        <SearchResultTile />
        <SearchResultTile />
        <SearchResultTile />
        <SearchResultTile />
        <SearchResultTile />
        <SearchResultTile />
      </ul>
      <div className="results__results-controls">
        <p className="results__results-controls__details">
          {"page 1 (1-25 of 336 results)"}
        </p>
        <nav className="results__results-controls__nav">
          <button 
            className={backButtonClassList}
            onClick={() => handlePageNav(false)}
            disabled={pageNum === 1}
          >back</button>
          <p className="results__results-controls__nav__page-num">1</p>
          <button 
            className="results__results-controls__nav__next"
            onClick={() => handlePageNav(true)}
          >next</button>
        </nav>
      </div>
    </section>
  )
}

export default SearchResultsView