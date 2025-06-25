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

  it('отображает в модалке данные именно того ингредиента, по которому кликнули', () => {
    cy.fixture('ingredients.json').then((data) => {
      // Проверяем для первого ингредиента
      const firstIngredient = data.data[0];
      cy.get('[data-cy=ingredient-card]')
        .contains(firstIngredient.name)
        .click();
      cy.get('[data-cy=modal]')
        .should('be.visible')
        .and('contain.text', firstIngredient.name);
      cy.get('[data-cy=modal-close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');
      // Проверяем для второго ингредиента
      const secondIngredient = data.data[1];
      cy.get('[data-cy=ingredient-card]')
        .contains(secondIngredient.name)
        .click();
      cy.get('[data-cy=modal]')
        .should('be.visible')
        .and('contain.text', secondIngredient.name);
      cy.get('[data-cy=modal-close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.fixture('ingredients.json').then((data) => {
      // Находим первый ингредиент с type bun)
      const bun = data.data.find(
        (ingredient: { type: string }) => ingredient.type === 'bun'
      );
      // Находим первый ингредиент с type main)
      const main = data.data.find(
        (ingredient: { type: string }) => ingredient.type === 'main'
      );

      // Добавляем булку
      cy.get('[data-cy=ingredient-card]')
        .contains(bun.name)
        .closest('[data-cy=ingredient-card]')
        .find('button')
        .click();
      cy.get('[data-cy=constructor-top-bun]').should('contain.text', bun.name);
      cy.get('[data-cy=constructor-bottom-bun]').should(
        'contain.text',
        bun.name
      );

      // Добавляем начинку
      cy.get('[data-cy=ingredient-card]')
        .contains(main.name)
        .closest('[data-cy=ingredient-card]')
        .find('button')
        .click();
      cy.get('[data-cy=constructor-ingredients]').should(
        'contain.text',
        main.name
      );
    });
  });
});
