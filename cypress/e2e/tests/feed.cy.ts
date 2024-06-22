import Login from "../classes/login";

describe('Counseling requests table', () => {
  beforeEach(() => {
    const login = new Login();
    cy.visit('http://localhost:4200/login');
    login.completeForm(
      'anca.dinea@gmail.com',
      'uNsnaPSpitte2.')
    login.submitButton();
    cy.wait(1000);
  })

  it('should display page title and search input', () => {
    cy.get('.page-title').should('contain.text', 'Articole disponibile');

    cy.get('.search-container input[placeholder="Caută un articol..."]').should('be.visible');
  });

  it('should display articles in the feed', () => {
    cy.get('#articlesFeed app-feed-article').should('have.length.greaterThan', 0);
  });

  it('should search for an article by typing in the search input', () => {
    cy.intercept({
      url: 'https://localhost:7066/api/Article/get-feed-articles',
      method: 'GET'
    }).as('getArticlesRequest')
    cy.wait('@getArticlesRequest').then(()=> {
      const searchTerm = 'aa';
      cy.get('.search-container input[placeholder="Caută un articol..."]').type(searchTerm).blur();
      cy.get('#articlesFeed app-feed-article').should('have.length.greaterThan', 0);
    })
  });

  it('should clear the search input', () => {
    const searchTerm = 'example article';
    cy.get('.search-container input[placeholder="Caută un articol..."]').type(searchTerm);
    cy.get('.search-container button[aria-label="Clear"]').click();
    cy.get('.search-container input[placeholder="Caută un articol..."]').should('have.value', '');
    cy.get('#articlesFeed app-feed-article').should('have.length.greaterThan', 0);
  });

})
