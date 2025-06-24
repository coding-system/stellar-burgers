/// <reference types="cypress" />

describe('Страница конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('отображает все ингредиенты из fixtures/ingredients.json', () => {
    cy.fixture('ingredients.json').then((data) => {
      (data.data as { name: string }[]).forEach((ingredient) => {
        cy.get('[data-cy=ingredient-card]').should(
          'contain.text',
          ingredient.name
        );
      });
    });
  });
});
