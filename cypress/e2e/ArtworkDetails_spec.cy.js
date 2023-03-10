import savedPieces from "../fixtures/savedPieces.json"

describe("Artwork Details View - Header", () => {
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

describe("Artwork Details View - Body", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/222094",
    }, {
      fixture: "morrisResult222094.json"
    })
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/14944",
    }, {
      fixture: "morrisResult14944.json"
    })
    cy.visit("http://localhost:3000/explore/222094")
  })

  it("should display a subset of data for the artwork", () => {
    cy.getByData("directory-department").should("have.text", "European Sculpture and Decorative Arts")
    cy.getByData("directory-artist").should("have.text", " / William Morris")
    cy.getByData("object-title").should("have.text", "Carpet")
    cy.getByData("object-date").should("have.text", "late 19th century")
    cy.getByData("object-artist-wiki").should("have.text", "William Morris")
      .invoke("attr", "href").should("eq", "https://www.wikidata.org/wiki/Q182589")
    cy.getByData("table-value-1").contains("Holland Park carpet")
    cy.getByData("table-value-2").contains("European Sculpture and Decorative Arts")
    cy.getByData("table-value-5").contains("Textiles-Rugs")
    cy.getByData("table-value-6").contains("Wool Turkish (Ghiordes) knot, 25 to the square inch")
    cy.getByData("table-value-7").contains("Bequest of Frank A. Munsey, 1927")
    cy.getByData("object-image").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245936.jpg")
    cy.getByData("object-image").invoke("attr", "alt").should("eq", "Carpet by William Morris")
  })

  it("should only have an artist wiki link if the data is available", () => {
    cy.visit("http://localhost:3000/explore/14944")
    cy.getByData("object-artist-no-wiki").should("be.visible")
    cy.getByData("object-artist-wiki").should("not.exist")
  })

  it("should have buttons/tiles for switching between images", () => {
    cy.getByData("image-tile-2").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245947.jpg")
    cy.getByData("image-tile-2").click()
    cy.getByData("object-image").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245947.jpg")
    cy.getByData("image-tile-2").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245936.jpg")
    
    cy.getByData("image-tile-3").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245948.jpg")
    cy.getByData("image-tile-3").click()
    cy.getByData("object-image").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245948.jpg")
    cy.getByData("image-tile-3").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/original/DP245947.jpg")
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

  it("should not give the user the option to add a previously saved piece to the same collection", () => {
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.getByData("add-collection-select").find("option").should("have.length", 2)
    cy.getByData("add-collection-select").select("Collection 1")
    cy.getByData("add-collection-submit").click()
    cy.getByData("add-collection-select").find("option").should("have.length", 1)
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

describe("Artwork Details View (bad request)", () => {
  it("should redirect to the \"bad request\" page when there is an error fetching the page", () => {
    cy.intercept("GET", "https://collectionapi.metmuseum.org/public/collection/v1/objects/222094", (req) => {
      req.reply({ statusCode: 404 })
    })
    cy.visit("http://localhost:3000/explore/222094")

    cy.url().should("eq", "http://localhost:3000/error")
    cy.getByData("error-page").should("be.visible")
  })
})

describe("Artwork Details (missing data)", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://collectionapi.metmuseum.org/public/collection/v1/objects/221477",
    }, {
      fixture: "morrisResult221477.json"
    })
    cy.visit("http://localhost:3000/explore/221477")
  })

  it("should only show an artist name if the data is available", () => {
    cy.getByData("object-artist-no-wiki").should("not.exist")
    cy.getByData("object-artist-wiki").should("not.exist")
    cy.getByData("directory-artist").should("not.exist")
    cy.getByData("artist-search-link").should("not.exist")
  })

  it("should only show table rows for available data", () => {
    cy.get("main").should("not.contain", "geography")
    cy.get("main").should("not.contain", "period")
    cy.get("main").should("not.contain", "classification")
  })

  it("should display a fallback image if there are no images available", () => {
    cy.getByData("object-image").invoke("attr", "src").should("eq", "/static/media/fallback.36cccec721043b9b96a4.png")
  })

  it("should should not display additional image buttons if there are no images available", () => {
    cy.getByData("image-button").should("not.exist")
  })
})