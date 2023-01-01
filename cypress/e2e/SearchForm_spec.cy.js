describe("Search Form - Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search-form")
  })

  it("should navigate to the homepage", () => {
    cy.getByData("home-header").click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should navigate to \"My Collections\"", () => {
    cy.getByData("collections-header").click()
    cy.url().should("eq", "http://localhost:3000/collections")
  })

  it("should navigate to itself", () => {
    cy.getByData("search-header").click()
    cy.url().should("eq", "http://localhost:3000/search-form")
  })

  it("displays the correct sub-header", () => {
    cy.getByData("sub-header").should("have.text", "EXPLORE")
  })
})

describe("Search Form - Body", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search-form")
  })

  it("should have a search input", () => {
    cy.getByData("search-input")
      .should("be.visible")
      .invoke("attr", "placeholder")
      .should("eq", "search...")
    cy.getByData("search-input").type("foo")
      .should("have.value", "foo")
  })

  it("should alert the user if submitted input is invalid", () => {
    cy.getByData("submit-search").click()
    cy.getByData("input-error").should("be.visible")
  })

  it("should have a select for search-type", () => {
    cy.getByData("type-select").should("be.visible")
  })

  it("should have the correct options for search types", () => {
    cy.getChildByData("type-select", "option")
      .should("have.length", 2)
      .first()
      .should("have.text", "keyword")
      .should("have.value", "keyword")
      .next()
      .should("have.text", "artist name")
      .should("have.value", "artist name")
  })

  it("should have a select for searching by department", () => {
    cy.getByData("type-select").should("be.visible")
  })

  it("should have the correct options for search types", () => {
    cy.getChildByData("dept-select", "option")
      .should("have.length", 20)
      .first()
      .should("have.text", "\(optional\)")
      .should("have.value", "optional")
      .next()
      .should("have.text", "American Decorative Arts")
      .should("have.value", "American Decorative Arts")
      .next()
      .should("have.text", "Ancient Near Eastern Art")
      .should("have.value", "Ancient Near Eastern Art")
      .next()
      .should("have.text", "Arms and Armor")
      .should("have.value", "Arms and Armor")
      .next()
      .should("have.text", "Arts of Africa, Oceania, and the Americas")
      .should("have.value", "Arts of Africa, Oceania, and the Americas")
      .next()
      .should("have.text", "Asian Art")
      .should("have.value", "Asian Art")
      .next()
      .should("have.text", "The Cloisters")
      .should("have.value", "The Cloisters")
      .next()
      .should("have.text", "The Costume Institute")
      .should("have.value", "The Costume Institute")
      .next()
      .should("have.text", "Drawings and Prints")
      .should("have.value", "Drawings and Prints")
      .next()
      .should("have.text", "Egyptian Art")
      .should("have.value", "Egyptian Art")
      .next()
      .should("have.text", "European Paintings")
      .should("have.value", "European Paintings")
      .next()
      .should("have.text", "European Sculpture and Decorative Arts")
      .should("have.value", "European Sculpture and Decorative Arts")
      .next()
      .should("have.text", "Greek and Roman Art")
      .should("have.value", "Greek and Roman Art")
      .next()
      .should("have.text", "Islamic Art")
      .should("have.value", "Islamic Art")
      .next()
      .should("have.text", "The Robert Lehman Collection")
      .should("have.value", "The Robert Lehman Collection")
      .next()
      .should("have.text", "The Libraries")
      .should("have.value", "The Libraries")
      .next()
      .should("have.text", "Medieval Art")
      .should("have.value", "Medieval Art")
      .next()
      .should("have.text", "Musical Instruments")
      .should("have.value", "Musical Instruments")
      .next()
      .should("have.text", "Photographs")
      .should("have.value", "Photographs")
      .next()
      .should("have.text", "Modern Art")
      .should("have.value", "Modern Art")
  })

  it("should navigate to the correct URL when searching by all departments", () => {
    cy.getByData("search-input").type("foo")
    cy.getByData("submit-search").click()
    cy.url().should("eq", "http://localhost:3000/search?query=foo&type=keyword&dept=all&page=1")
  })

  it("should navigate to the correct URL when searching by a specific department", () => {
    cy.getByData("search-input").type("foo")
    cy.getByData("dept-select").select("Modern Art")
    cy.getByData("submit-search").click()
    cy.url().should("eq", "http://localhost:3000/search?query=foo&type=keyword&dept=21&page=1")
  })
})