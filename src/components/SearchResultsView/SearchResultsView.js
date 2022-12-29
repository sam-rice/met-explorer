import React, { useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchNewSearch, fetchPage } from "../../actions"

import "./_SearchResultsView.scss"
import SearchResultTile from "../SearchResultTile/SearchResultTile"

function SearchResultsView() {

  const dispatch = useDispatch()
  const { isLoading, allResults, currentPageResults } = useSelector(({ results }) => results)
  const [searchParams, setSearchParams] = useSearchParams()
  const didMountRef = useRef(false)

  const query = searchParams.get("query")
  const type = searchParams.get("type")
  const dept = searchParams.get("dept")
  const pageNum = Number(searchParams.get("page"))

  useEffect(() => {
    initSearch()
  }, [])

  const initSearch = () => {
    const departmentParam = dept !== "all" ? `departmentId=${dept}&` : ""
    const typeParam = type === "artist" ? "artistOrCulture=true&" : ""
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?${departmentParam}${typeParam}q=${query.replace(/ /g, "+")}`
    dispatch(fetchNewSearch(url, pageNum))
  }

  useEffect(() => {
    if (didMountRef.current) {
      const targetEndIndex = pageNum * 25
      const targetObjectIDs = allResults.objectIDs.slice(targetEndIndex - 25, targetEndIndex)
      dispatch(fetchPage(targetObjectIDs))
      window.scrollTo({ top: 100 })
    }
    didMountRef.current = true
  }, [pageNum])

  const handlePageNav = (bool) => {
    setSearchParams({
      query,
      type,
      dept,
      page: bool ? pageNum + 1 : pageNum - 1
    })
  }

  const resultsTiles = currentPageResults && currentPageResults.map(result => {
    if (result) {
      return <SearchResultTile key={result.ObjectID} data={result} />
    }
  })

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
        {resultsTiles}
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