import { connect } from "react-redux"
import { fetchResults } from "../actions"
import SearchResultsView from "../components/SearchResultsView/SearchResultsView"

const mapStateToProps = state => ({
  allResults: state.results.allResults,
  currentPageResults: state.results.currentPageResults
})

const mapDispatchToProps = dispatch => ({
  fetchResults: () => {
    dispatch(fetchResults())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsView)