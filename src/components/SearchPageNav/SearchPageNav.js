
import "./_SearchPageNav.scss"

const SearchPageNav = ({ pageNum, handlePageNav, backDisabled, nextDisabled, displayedResultsCount }) => {

  const backButtonClassList = backDisabled ?
    "results-controls__nav__back nav--disabled" :
    "results-controls__nav__back"

  const nextButtonClassList = nextDisabled ?
    "results-controls__nav__next nav--disabled" :
    "results-controls__nav__next"

  return (
    <div className="results-controls">
      <p
        className="results-controls__details"
        data-cy="results-count-lower"
      >
        {displayedResultsCount}
      </p>
      <nav className="results-controls__nav">
        <button
          className={backButtonClassList}
          onClick={() => handlePageNav(false)}
          disabled={backDisabled}
          data-cy="back-button"
        >back</button>
        <p className="results-controls__nav__page-num">{pageNum}</p>
        <button
          className={nextButtonClassList}
          onClick={() => handlePageNav(true)}
          disabled={nextDisabled}
          data-cy="next-button"
        >next</button>
      </nav>
    </div>
  )
}

export default SearchPageNav