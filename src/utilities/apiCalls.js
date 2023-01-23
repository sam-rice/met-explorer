export const getArtworkDetails = async objectID => {
  return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
}

export const fetchPage = async objectIDs => {
  const promises = await objectIDs.map(async objectID => {
    const response = await getArtworkDetails(objectID)
    const data = await response.json()
    return data
  })
  const settledPromises = await Promise.allSettled(promises)
  return settledPromises.map(promise => promise.value)
}