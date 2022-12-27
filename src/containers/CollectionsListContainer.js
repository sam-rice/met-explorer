import { connect } from "react-redux"
import { createCollection } from "../actions"
import CollectionsList from "../components/CollectionsList/CollectionsList"

const mapStateToProps = state => ({
  collections: state.collections
})

const mapDispatchToProps = dispatch => ({
  createCollection: (name, id) => {
    dispatch(createCollection(name, id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsList)