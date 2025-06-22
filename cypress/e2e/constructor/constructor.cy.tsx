describe('Страница конструктора', () => {
  it('должен загружать страницу', () => {
    cy.visit('/');
    cy.get('body').should('exist');
  });
});
