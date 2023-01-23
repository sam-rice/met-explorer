
import "./_SearchPageNav.scss"

const SearchPageNav = ({ pageNum, handlePageNav, backDisabled, nextDisabled }) => {

  const backButtonClassList = backDisabled ?
    "results__results-controls__nav__back nav--disabled" :
    "results__results-controls__nav__back"

  const nextButtonClassList = nextDisabled ?
    "results__results-controls__nav__next nav--disabled" :
    "results__results-controls__nav__next"

  return (
    <nav className="results__results-controls__nav">
      <button
        className={backButtonClassList}
        onClick={() => handlePageNav(false)}
        disabled={backDisabled}
        data-cy="back-button"
      >back</button>
      <p className="results__results-controls__nav__page-num">{pageNum}</p>
      <button
        className={nextButtonClassList}
        onClick={() => handlePageNav(true)}
        disabled={nextDisabled}
        data-cy="next-button"
      >next</button>
    </nav>
  )
}

export default SearchPageNav