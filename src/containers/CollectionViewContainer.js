import { connect } from "react-redux"
import { updateNote } from "../actions"
import CollectionView from "../components/CollectionView/CollectionView"

const mapStateToProps = state => ({
  collections: state.collections
})

const mapDispatchToProps = dispatch => ({
  updateNote: (text, collectionID, objectID) => {
    dispatch(updateNote(text, collectionID, objectID))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionView)