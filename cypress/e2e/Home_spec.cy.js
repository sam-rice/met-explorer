describe("Home Page", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("displays the website title", () => {
    cy.getByData("title-left").should("have.text", "MET")
    cy.getByData("title-right").should("have.text", "EXPLORER")
  })

  it("should navigate to \"My Collections\"", () => {
    cy.getByData("collections-link")
      .should("have.text", "MY COLLECTIONS")
      .click()
    cy.url().should("eq", "http://localhost:3000/collections")
  })

  it("should navigate to \"Explore\"", () => {
    cy.getByData("explore-link")
      .should("have.text", "EXPLORE")
      .click()
    cy.url().should("eq", "http://localhost:3000/search-form")
  })

  it("should show featured content", () => {
    cy.getChildByData("featured-parent", "h3").should("have.text", "William Morris & Contemporaries")
  })

  it("should navigate to a search page of featured content", () => {
    cy.getByData("view-featured")
      .click()
    cy.url().should("eq", "http://localhost:3000/search?query=william+morris&type=keyword&dept=12&page=1")
  })
})