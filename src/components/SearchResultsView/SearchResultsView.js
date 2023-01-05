import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchResults } from "../../actions"

import "./_SearchResultsView.scss"
import SearchResultTile from "../SearchResultTile/SearchResultTile"
import { deptKey } from "../../utilities/global-static-data"

function SearchResultsView() {
  const dispatch = useDispatch()
  const { isLoadingResults = true, allResults } = useSelector(({ results }) => results)
  const [currentPageResults, setCurrentPageResults] = useState([])
  const [resultTiles, setResultTiles] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

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
      fetchPage(targetObjectIDs)
      window.scrollTo({ top: 100 })
    } else if (!isLoadingResults && !allResults) {
      setNoResults(true)
    }
  }

  useEffect(() => {
    setResultTiles(currentPageResults.filter(result => !result.hasOwnProperty("message"))
      .map(result => (
        <SearchResultTile
          data={result}
          key={result.objectID}
        />))
    )
    setPageLoading(false)
  }, [currentPageResults])

  const fetchPage = async objectIDs => {
    const promises = await objectIDs.map(async objectID => {
      // try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
      // if (!response.ok) {
      // throw Error(response.statusText)
      // }
      const data = await response.json()
      return data
      // } catch (error) {
      // setPageLoading(false)

      //   console.log(error)
      // }
    })
    const settledPromises = await Promise.allSettled(promises)
    const pageData = settledPromises.map(promise => promise.value)
    setCurrentPageResults(pageData)
  }

  const handlePageNav = (bool) => {
    setSearchParams({
      query,
      type,
      dept,
      page: bool ? pageNum + 1 : pageNum - 1
    })
    setResultTiles([])
    setPageLoading(true)
  }

  const totalResultsCount = allResults?.objectIDs.length ?
    allResults.objectIDs.length.toLocaleString("en-US") :
    0

  const headerSearchParams = !isLoadingResults &&
    <>
      <h3 
        className="results__header__left__search-params"
        data-cy="params-main"
      >
        {totalResultsCount} results for "{query}"
      </h3>
      <p 
        className="results__header__left__dept"
        data-cy="params-dept"
      >
        in {dept === "all" ? "all departments" : Object.keys(deptKey)[dept - 1]}
      </p>
    </>

  const displayedResultsCount = `viewing ${resultTiles.length ? resultTiles.length : 0} of ${totalResultsCount} results`

  const backButtonClassList = pageNum === 1 ?
  "results__results-controls__nav__back nav--disabled" :
    "results__results-controls__nav__back"

  const nextButtonClassList = pageNum === Math.ceil(allResults?.objectIDs.length / 25) || noResults ?
  "results__results-controls__nav__next nav--disabled" :
    "results__results-controls__nav__next"

  return (
    <section className="results">
      <div className="results__header">
        <div className="results__header__left">
          {headerSearchParams}
        </div>
        <p 
          className="gray--text"
          data-cy="results-count-upper"
        >
          {displayedResultsCount}
        </p>
      </div>
      <ul
        className="results__list"
        data-cy="results-list"
      >
        {!noResults && !pageLoading && resultTiles}
        {noResults && <p data-cy="no-results">no results matching your search</p>}
        {(isLoadingResults || pageLoading) && <p>Loading...</p>}
      </ul>
      <div className="results__results-controls">
        <p 
          className="results__results-controls__details"
          data-cy="results-count-lower"
        >
          {displayedResultsCount}
        </p>
        <nav className="results__results-controls__nav">
          <button
            className={backButtonClassList}
            onClick={() => handlePageNav(false)}
            disabled={pageNum === 1}
            data-cy="back-button"
          >back</button>
          <p className="results__results-controls__nav__page-num">{pageNum}</p>
          <button
            className={nextButtonClassList}
            onClick={() => handlePageNav(true)}
            disabled={pageNum === Math.ceil(allResults?.objectIDs.length / 25) || noResults}
            data-cy="next-button"
          >next</button>
        </nav>
      </div>
    </section>
  )
}

export default SearchResultsView