import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchResults } from "../../actions"
import { fetchPage } from "../../utilities/apiCalls"

import "./_SearchResultsView.scss"
import SearchResultTile from "../SearchResultTile/SearchResultTile"
import SearchPageNav from "../SearchPageNav/SearchPageNav"
import { deptKey } from "../../utilities/global-static-data"

function SearchResultsView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoadingResults = true, allResults, errorMsg } = useSelector(({ results }) => results)
  const [currentPageResults, setCurrentPageResults] = useState([])
  const [resultTiles, setResultTiles] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query")
  const type = searchParams.get("type")
  const dept = searchParams.get("dept")
  const pageNum = parseInt(searchParams.get("page"))

  useEffect(() => {
    initSearch()
  }, [])

  useEffect(() => {
    renderTiles()
  }, [currentPageResults])

  useEffect(() => {
    getNewPage()
  }, [isLoadingResults, pageNum])

  useEffect(() => {
    if (!errorMsg) return
    navigate("/error")
  }, [errorMsg])

  const initSearch = async () => {
    const departmentParam = dept !== "all" ? `departmentId=${dept}&` : ""
    const typeParam = type === "artist" ? "artistOrCulture=true&" : ""
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?${departmentParam}${typeParam}q=${query.replace(/ /g, "+")}`
    dispatch(fetchResults(url, pageNum))
  }

  const renderTiles = () => {
    setResultTiles(currentPageResults.filter(result => !result.hasOwnProperty("message"))
      .map(result => (
        <SearchResultTile
          data={result}
          key={result.objectID}
        />))
    )
    setPageLoading(false)
  }

  const getNewPage = async () => {
    if (!isLoadingResults && allResults) {
      const targetEndIndex = pageNum * 25
      const targetObjectIDs = allResults.objectIDs.slice(targetEndIndex - 25, targetEndIndex)
      window.scrollTo({ top: 100 })
      const pageData = await fetchPage(targetObjectIDs)
      setCurrentPageResults(pageData)
    } else if (!isLoadingResults && !allResults) {
      setNoResults(true)
    }
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

  const totalResultsCount = !!allResults?.objectIDs ?
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
        <SearchPageNav 
          pageNum={pageNum}
          handlePageNav={handlePageNav}
          backDisabled={pageNum === 1}
          nextDisabled={pageNum === Math.ceil(allResults?.objectIDs.length / 25) || noResults}
        />
      </div>
    </section>
  )
}

export default SearchResultsView