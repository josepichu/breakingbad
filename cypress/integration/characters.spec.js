/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Character list page", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/");
  });

  it("displays characters", () => {
    cy.get(".characters-list-container").should("not.be.empty");
  });

  it("search by name and get item", () => {
    cy.get("input").type(`Heisenberg{enter}`);
    cy.get(".characters-list-container").should("have.length", 1);
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
    cy.get(".characters-list-container div").first().click();

    // back btn should be disabled first time
    cy.get(".characters-back-btn").should("be.disabled");

    // get next character
    cy.get(".characters-following-btn").click();
    cy.get(".characters-back-btn").should("not.be.disabled");

  });
});
