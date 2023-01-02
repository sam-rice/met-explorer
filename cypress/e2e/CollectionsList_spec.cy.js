import savedPieces from "../fixtures/savedPieces.json"

describe("Collections List - Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/collections")
  })

  it("should navigate to the homepage", () => {
    cy.getByData("home-header").click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should navigate to itself", () => {
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

describe("Collections List - Initial", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/collections")
  })

  it("tell the user that there are no collections yet", () => {
    cy.getByData("no-collections").should("be.visible")
  })

  it("should display the number of collections", () => {
    cy.getByData("collections-count").should("have.text", "0 collections")
  })

  it("should have buttons for opening/closing the \"new collection\" modal", () => {
    cy.getByData("modal-open")
      .should("be.visible")
      .click()
    cy.get(".ReactModal__Overlay").should("be.visible")
    cy.get(".ReactModal__Content").should("be.visible")

    cy.getByData("modal-close").click()
    cy.get(".ReactModal__Overlay").should("not.be.visible")
    cy.get(".ReactModal__Content").should("not.be.visible")
  })

  it("should allow the user to add their first collection", () => {
    cy.clock()
    cy.getByData("modal-open").click()
    cy.getByData("modal-input").type("Collection 1")
    cy.getByData("modal-submit").click()
    cy.get(".ReactModal__Overlay").should("not.be.visible")
    cy.get(".ReactModal__Content").should("not.be.visible")
    cy.getByData("collection-0").should("exist")
    cy.assertState({
      collections: [{
        name: "Collection 1",
        id: 0,
        pieces: []
      }],
      results: {}
    })
  })
})

describe("Collections List - Managing Collections", () => {
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
    cy.visit("http://localhost:3000/collections")
    cy.dispatchCollectionToStore("Collection 1", 100)
    cy.dispatchPieceToCollection(100, savedPieces[0])
    cy.dispatchCollectionToStore("Collection 2", 200)
  })

  it("should display a collection \"tile\" for each previously-saved collection", () => {
    cy.getByData("collection-100").should("exist")
    cy.getByData("collection-200")
      .should("exist")
      .find("h4")
      .should("have.text", "Collection 2")
  })

  it("should have global state that contains the current collections", () => {
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
            "userNotes": ""
          }]
        },
        {
          name: "Collection 2",
          id: 200,
          pieces: []
        }
      ],
      results: {}
    })
  })

  it("should display a thumbnail for the first saved piece in each collection, if there are any saved pieces", () => {
    cy.getByData("collection-100").find("img").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/ad/web-large/RT560.jpg")
    cy.getByData("collection-200").find("img").should("not.exist")
  })

  it("should navigate to the \"Collection View\" when a collection tile is clicked", () => {
    cy.getByData("collection-100").click()
    cy.url().should("eq", "http://localhost:3000/collections/100")
  })

  it("should update the thumbnail if the first saved piece of a collection is deleted", () => {
    cy.getByData("collection-100").click()
    cy.getByData("saved-piece-14944").find('[data-cy="delete-button"]').click()
    cy.go("back")
    cy.dispatchPieceToCollection(100, savedPieces[1])
    cy.getByData("collection-100").find("img").invoke("attr", "src").should("eq", "https://images.metmuseum.org/CRDImages/es/web-large/DP105780.jpg")
  })

  it("should display the total number of user collections", () => {
    cy.getByData("collections-count").should("have.text", "2 collections")
  })

  it("should only display a department list (3 departments max) if there are any saved pieces", () => {
    cy.getByData("collection-200").find('[data-cy="department-list"]').should("not.be.visible")
    cy.getByData("collection-100").find('[data-cy="department-list"]').should("have.text", "departments: The American Wing")

    cy.dispatchPieceToCollection(100, savedPieces[1])
    cy.getByData("collection-100").find('[data-cy="department-list"]').should("have.text", "departments: The American Wing, European Sculpture and Decorative Arts")

    cy.dispatchPieceToCollection(100, savedPieces[2])
    cy.getByData("collection-100").find('[data-cy="department-list"]').should("have.text", "departments: The American Wing, European Sculpture and Decorative Arts, Photographs...")

    cy.dispatchPieceToCollection(100, savedPieces[3])
    cy.getByData("collection-100").find('[data-cy="department-list"]').should("have.text", "departments: The American Wing, European Sculpture and Decorative Arts, Photographs...")
  })

  it("should display the collection's total number of saved pieces", () => {
    cy.getByData("collection-200").find('[data-cy="saved-count"]').should("have.text", "0 pieces")
    cy.getByData("collection-100").find('[data-cy="saved-count"]').should("have.text", "1 piece")

    cy.dispatchPieceToCollection(100, savedPieces[1])
    cy.getByData("collection-100").find('[data-cy="saved-count"]').should("have.text", "2 pieces")
  })

  it("should allow the user to delete collections", () => {
    cy.getByData("collection-100").find('[data-cy="delete-button"]').click()
    cy.getByData("collection-100").should("not.exist")
    cy.getByData("collection-200").should("be.visible")
  })
})