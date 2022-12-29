import { connect } from "react-redux"
import { fetchPage, initSearch } from "../actions"
import SearchResultsView from "../components/SearchResultsView/SearchResultsView"

const mapStateToProps = state => ({
  results: state.results
})

const mapDispatchToProps = dispatch => ({
  fetchPage: () => {
    dispatch(fetchPage())
  },
  initSearch: () => {
    dispatch(initSearch())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsView)