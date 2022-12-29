import { connect } from "react-redux"
import { fetchNewSearch, fetchPage } from "../actions"
import SearchResultsView from "../components/SearchResultsView/SearchResultsView"

const mapStateToProps = state => ({
  allResults: state.results.allResults,
  currentPageResults: state.results.currentPageResults
})

const mapDispatchToProps = dispatch => ({
  fetchPage: () => {
    dispatch(fetchPage())
  },
  fetchNewSearch: () => {
    dispatch(fetchNewSearch())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsView)