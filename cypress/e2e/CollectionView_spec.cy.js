import savedPieces from "../fixtures/savedPieces.json"

describe("Collection View - Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/collections")
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.dispatchPieceToCollection(100, savedPieces[0])
    cy.getByData("collection-100").click()
  })

  it("should navigate to the homepage", () => {
    cy.getByData("home-header").click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should navigate to the collections page", () => {
    cy.getByData("collections-header").click()
    cy.url().should("eq", "http://localhost:3000/collections")
  })

  it("should navigate to the search form", () => {
    cy.getByData("search-header").click()
    cy.url().should("eq", "http://localhost:3000/search-form")
  })

  it("displays the correct sub-header", () => {
    cy.getByData("sub-header").should("have.text", "MYCOLLECTIONS")
  })
})

describe("Collection View - Body", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/collections")
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.dispatchPieceToCollection(100, savedPieces[0])
    cy.getByData("collection-100").click()
  })

  it("should display the collection's name and number of saved pieces", () => {
    cy.getByData("name").should("have.text", "Collection 1")
    cy.getByData("piece-count").should("have.text", "1 piece")
    cy.getByData("pieces-list").find("li").should("have.length", 1)

    cy.dispatchPieceToCollection(100, savedPieces[1])
    cy.getByData("piece-count").should("have.text", "2 pieces")
    cy.getByData("pieces-list").find("li").should("have.length", 2)
  })

  it("should allow the user to delete saved pieces from a collection", () => {
    cy.getByData("delete-button").click()
    cy.getByData("piece-count").should("have.text", "0 pieces")
    cy.getByData("pieces-list").find("li").should("have.length", 0)
  })

  it("should alert the user when there are no saved pieces in a collection", () => {
    cy.getByData("delete-button").click()
    cy.getByData("no-pieces-message").should("have.text", "no pieces in \"Collection 1\" yet")
  })

  it("should navigate to the \"Artwork Detail\" page when a saved piece tile is clicked", () => {
    cy.getByData("saved-piece-14944").click()
    cy.url().should("eq", "http://localhost:3000/explore/14944")
  })

  it("should display a subset of data for each saved piece", () => {
    cy.getChildByData("saved-piece-14944", "img").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/ad/web-large/RT560.jpg")
    cy.getChildByData("saved-piece-14944", '[data-cy="object-name"]').should("have.text", "Curtain")
    cy.getChildByData("saved-piece-14944", '[data-cy="object-date"]').should("have.text", "ca. ca. 1882")
    cy.getChildByData("saved-piece-14944", '[data-cy="object-culture"]').should("have.text", "American or British")
    cy.getChildByData("saved-piece-14944", '[data-cy="object-department"]').should("have.text", "department: The American Wing")
    cy.getChildByData("saved-piece-14944", '[data-cy="artist-link"]').should("have.text", "William Morris")
  })

  it("should have a link that navigates to search results for the artist", () => {
    cy.getChildByData("saved-piece-14944", '[data-cy="artist-link"]').click()
    cy.url().should("eq", "http://localhost:3000/search?query=William+Morris&type=artist&dept=all&page=1")
  })

  it("should allow the user to save notes for each saved piece", () => {
    cy.getChildByData("saved-piece-14944", '[data-cy="user-notes"]')
      .type("foo bar")
      .should("have.value", "foo bar")
    cy.assertState({
      collections: [
        {
          name: "Collection 1",
          id: 100,
          pieces: [{
            "artistName": "William Morris",
            "culture": "American or British",
            "department": "The American Wing",
            "objectDate": "ca. 1882",
            "objectID": "14944",
            "objectName": "Curtain",
            "imageSmall": "https://images.metmuseum.org/CRDImages/ad/web-large/RT560.jpg",
            "userNotes": "foo bar"
          }]
        }],
      results: {}
    })
    cy.go("back")
    cy.go("forward")
    cy.getChildByData("saved-piece-14944", '[data-cy="user-notes"]').should("have.value", "foo bar")
  })
})