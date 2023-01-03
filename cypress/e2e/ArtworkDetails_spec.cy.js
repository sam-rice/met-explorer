import savedPieces from "../fixtures/savedPieces.json"

describe("Artwork Details - Header", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/222094",
    }, {
      fixture: "morrisResult222094.json"
    })
    cy.visit("http://localhost:3000/explore/222094")
  })

  it("should navigate to the homepage", () => {
    cy.getByData("home-header").click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should navigate to the collections view", () => {
    cy.getByData("collections-header").click()
    cy.url().should("eq", "http://localhost:3000/collections")
  })

  it("should navigate to the search form", () => {
    cy.getByData("search-header").click()
    cy.url().should("eq", "http://localhost:3000/search-form")
  })

  it("displays the correct sub-header", () => {
    cy.getByData("sub-header").should("have.text", "EXPLORE")
  })
})

describe("Artwork Details - Body", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/222094",
    }, {
      fixture: "morrisResult222094.json"
    })
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/221477",
    }, {
      fixture: "morrisResult221477.json"
    })
    cy.visit("http://localhost:3000/explore/222094")
  })

  it("should display a subset of data for the artwork", () => {
    cy.getByData("directory-department").should("have.text", "European Sculpture and Decorative Arts")
    cy.getByData("directory-artist").should("have.text", " / William Morris")
    cy.getByData("object-title").should("have.text", "Carpet")
    cy.getByData("object-date").should("have.text", "late 19th century")
    cy.getByData("object-artist-wiki").should("have.text", "William Morris")
    cy.getByData("table-value-1").contains("Holland Park carpet")
    cy.getByData("table-value-2").contains("European Sculpture and Decorative Arts")
    cy.getByData("table-value-5").contains("Textiles-Rugs")
    cy.getByData("table-value-6").contains("Wool Turkish (Ghiordes) knot, 25 to the square inch")
    cy.getByData("table-value-7").contains("Bequest of Frank A. Munsey, 1927")
    cy.getByData("object-image").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245936.jpg")
    cy.getByData("object-image").invoke("attr", "alt").should("eq", "Carpet by William Morris")
  })

  it("should have an artist link that navigates to the artist's Wikidata page", () => {
    cy.getByData("object-artist-wiki").invoke("attr", "href").should("eq", "https://www.wikidata.org/wiki/Q182589")
  })

  it("should have an artist link that navigates to a search page for the artist", () => {
    cy.getByData("artist-search-link").click()
    cy.url().should("eq", "http://localhost:3000/search?query=William+Morris&type=artist&dept=all&page=1")
  })

  it("should have a form for adding the viewed piece to a collection", () => {
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.getByData("add-collection-select").should("be.visible")
    cy.getByData("add-collection-select").select("Collection 1")
      .find(":selected").should("have.value", "Collection 1")
    cy.getByData("add-collection-submit").should("be.visible")
  })

  it("should allow a user to add the viewed piece to a collection", () => {
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.getByData("add-collection-select").select("Collection 1")
    cy.getByData("add-collection-submit").click()
    cy.assertState({
      collections: [
        {
          name: "Collection 1",
          id: 100,
          pieces: [{
            ...savedPieces[4],
            "userNotes": ""
          }]
        }
      ],
      results: {}
    })
  })

  it("should tell the user that the piece is now saved in their collection", () => {
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.getByData("add-collection-select").select("Collection 1")
    cy.getByData("add-collection-submit").click()
    cy.getByData("previously-saved-message").should("have.text", "this piece is saved in your collection: \"Collection 1\"")
  })

  it("should have a persisting saved message when a piece has been previously saved", () => {
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.getByData("add-collection-select").select("Collection 1")
    cy.getByData("add-collection-submit").click()
    cy.getByData("collections-header").click()
    cy.getByData("collection-100").click()
    cy.getByData("saved-piece-222094").click()
    cy.getByData("previously-saved-message").should("have.text", "this piece is saved in your collection: \"Collection 1\"")
  })
})
