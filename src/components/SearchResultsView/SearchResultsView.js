import React from "react"

import "./_SearchResultsView.scss"

function SearchResultsView() {

  return (
    <section className="results">
      <div className="results__header">
        <div className="results__header__left">
          <h3 className="results__header__left__search-params">336 results for "tolouse lautrec"</h3>
          <p className="results__header__left__dept">in European Paintings</p>
        </div>
        <p className="gray--text">displaying 1-25 of 336 results</p>
      </div>
      <ul className="results__list">
        {/* <SearchResultTile /> */}

      </ul>
      <div className="results__results-controls">
        <p className="results__results-controls__details">{"page 1 (1-25 of 336 results)"}</p>
        <nav className="results__results-controls__nav">
          <button className="results__results-controls__nav__back">back</button>
          <p className="results__results-controls__nav__page-num">1</p>
          <button className="results__results-controls__nav__next">next</button>
        </nav>
      </div>
    </section>
  )
}

export default SearchResultsView