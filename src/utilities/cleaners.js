export const cleanDetails = ({
  additionalImages,
  artistDisplayName,
  artistWikidetails_URL,
  classification,
  country,
  culture,
  creditLine,
  department,
  title,
  geographyType,
  primaryImageSmall,
  medium,
  objectDate,
  objectName,
  objectURL,
  period,
  region
}) => {
return {
  additionalImages,
  artistName: artistDisplayName,
  artistURL: artistWikidetails_URL,
  classification,
  country,
  culture,
  creditLine,
  department,
  description: title,
  geographyType,
  imageSmall: primaryImageSmall,
  medium,
  objectDate,
  objectName,
  metURL: objectURL,
  period,
  region
}
}