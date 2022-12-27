import { connect } from "react-redux"
// import { createCollection } from "../actions"
import CollectionView from "../components/CollectionView/CollectionView"

const mapStateToProps = state => ({
  collections: state.collections
})

// const mapDispatchToProps = dispatch => ({
//   createCollection: (name, id) => {
//     dispatch(createCollection(name, id))
//   }
// })

export default connect(mapStateToProps)(CollectionView)