import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPage, fetchResults } from "../../actions"

import "./_SearchResultsView.scss"
import SearchResultTile from "../SearchResultTile/SearchResultTile"
import { deptKey } from "../../utilities/global-static-data"

function SearchResultsView() {
  const dispatch = useDispatch()
  const { isLoadingResults = true, isLoadingPage = true, allResults, currentPageResults } = useSelector(({ results }) => results)
  const [searchParams, setSearchParams] = useSearchParams()

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
    dispatch(fetchResults(url, pageNum))
  }

  useEffect(() => {
    getNewPage()
  }, [isLoadingResults, pageNum])

  const getNewPage = () => {
    if (!isLoadingResults && allResults) {
      const targetEndIndex = pageNum * 25
      const targetObjectIDs = allResults.objectIDs.slice(targetEndIndex - 25, targetEndIndex)
      dispatch(fetchPage(targetObjectIDs))
      window.scrollTo({ top: 100 })
    } else if (!isLoadingResults) {
      console.log("handle no results")
    }
  }

  const handlePageNav = (bool) => {
    setSearchParams({
      query,
      type,
      dept,
      page: bool ? pageNum + 1 : pageNum - 1
    })
  }

  const resultsTiles = !isLoadingPage &&
    currentPageResults.filter(result => !result.hasOwnProperty("message"))
      .map(result => <SearchResultTile key={result.objectID} data={result} />)

  const totalResultsCount = !isLoadingResults && allResults.objectIDs.length.toLocaleString("en-US")

  const headerSearchParams = !isLoadingResults &&
    <>
      <h3 className="results__header__left__search-params">
        {totalResultsCount} results for "{query}"
      </h3>
      <p className="results__header__left__dept">
        in {dept === "all" ? "all departments" : Object.keys(deptKey)[dept - 1]}
      </p>
    </>

  const displayedResultsCount = !isLoadingPage &&
    `viewing ${resultsTiles.length} of ${totalResultsCount} results`

  const backButtonClassList = pageNum !== 1 ?
    "results__results-controls__nav__back" :
    "results__results-controls__nav__back back--disabled"

  return (
    <section className="results">
      <div className="results__header">
        <div className="results__header__left">
          {headerSearchParams}
        </div>
        <p className="gray--text">
          {displayedResultsCount}
        </p>
      </div>
      <ul className="results__list">
        {resultsTiles}
      </ul>
      <div className="results__results-controls">
        <p className="results__results-controls__details">
          {displayedResultsCount}
        </p>
        <nav className="results__results-controls__nav">
          <button
            className={backButtonClassList}
            onClick={() => handlePageNav(false)}
            disabled={pageNum === 1}
          >back</button>
          <p className="results__results-controls__nav__page-num">{pageNum}</p>
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