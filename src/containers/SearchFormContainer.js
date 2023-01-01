import { connect } from "react-redux"
import { resetSearch } from "../actions"
import SearchForm from "../components/SearchForm/SearchForm"

const mapDispatchToProps = dispatch => ({
  resetSearch: () => {
    dispatch(resetSearch())
  }
})

export default connect(mapDispatchToProps)(SearchForm)