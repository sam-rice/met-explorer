import { connect } from "react-redux"
import { fetchResults } from "../actions"
import SearchResultsView from "../components/SearchResultsView/SearchResultsView"

const mapDispatchToProps = dispatch => ({
  fetchResults: () => {
    dispatch(fetchResults())
  }
})

export default connect(mapDispatchToProps)(SearchResultsView)