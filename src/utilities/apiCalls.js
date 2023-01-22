export const getArtworkDetails = async (objectID) => {
  return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
}