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

  it('открывает и закрывает модальное окно ингредиента', () => {
    // Открыть модалку
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-cy=modal]').should('be.visible');
    // Закрыть на кнопку
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    // Открыть модалку
    cy.get('[data-cy=ingredient-card]').eq(1).click();
    cy.get('[data-cy=modal]').should('be.visible');
    // Кликнуть на оверлей
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
