/// <reference types="cypress" />

describe("Character list page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("displays characters", () => {
    cy.get(".characters-list-container").should("not.be.empty");
    cy.get(".characters-list-container > div").should("have.length", 62);
  });

  it("search by name and get item", () => {
    cy.get("input").type(`Heisenberg{enter}`);
    cy.get(".characters-list-container > div").should("have.length", 1);
    cy.get(".characters-list-container").first().contains("Walter White");
  });

  it("navigate to character details", () => {
    cy.get("input").type(`Heisenberg{enter}`);
    cy.get(".characters-list-container div").first().click();
    cy.get(".character-details").contains("Walter White");
    cy.get(".character-details").contains("Bryan Cranston");
  });

  it("navigate to character details and go back to character list", () => {
    cy.get("input").type(`Heisenberg{enter}`);
    cy.get(".characters-list-container div").first().click();
    cy.get(".character-details").contains("Walter White");
    cy.get(".character-details").contains("Bryan Cranston");

    // back to char list
    cy.get(".back-btn").click();
    // should have same filtered data
    cy.get(".characters-list-container").first().contains("Walter White");
    cy.get(".characters-list-container").should("have.length", 1);
  });

  it("navigate to character details and navigate throw others characters", () => {
    cy.get("input").type(`walter{enter}`);
    // should have 2 items: walter white & walter junior
    cy.get(".characters-list-container > div").should("have.length", 2);

    // access to details
    cy.get(".characters-list-container div").first().click();

    // back btn should be disabled first time
    cy.get(".characters-back-btn").should("be.disabled");

    // get next character
    cy.get(".characters-following-btn").click();
    cy.get(".characters-back-btn").should("not.be.disabled");
  });
});
