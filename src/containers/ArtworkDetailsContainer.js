import { connect } from "react-redux"
import { addToCollection } from "../actions"
import ArtworkDetails from "../components/ArtworkDetails/ArtworkDetails"

const mapStateToProps = state => ({
  collections: state.collections
})

const mapDispatchToProps = dispatch => ({
  addToCollection: () => {
    dispatch(addToCollection())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDetails)