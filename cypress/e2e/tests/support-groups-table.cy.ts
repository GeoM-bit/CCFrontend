import Login from "../classes/login";

describe('test spec', () => {
  context('Groups table testing', () => {
    const login = new Login();
    beforeEach(() => {
      cy.visit('http://localhost:4200/login')
      login.completeForm(
        'matei.georgiana11@gmail.com',
        'uNsnaPSpitte2.')
      login.submitButton();
      cy.get('#supportGroupsEntry').click();
    });
  });

it('should load the page with the correct title', () => {
  cy.get('.page-title').should('contain', 'Grupuri de suport');
});

it('should have a search input and accept text', () => {
  cy.get('input[placeholder="Caută un grup..."]').type('Test Group').should('have.value', 'Test Group');
});

it('should clear the search input when the clear button is clicked', () => {
  cy.get('input[placeholder="Caută un grup..."]').type('Test Group');
  cy.get('button[aria-label="Clear"]').click();
  cy.get('input[placeholder="Caută un grup..."]').should('have.value', '');
});

it('should display the correct table headers', () => {
  cy.get('th.mat-header-cell').eq(0).should('contain', 'Numele grupului');
  cy.get('th.mat-header-cell').eq(1).should('contain', 'Descriere');
  cy.get('th.mat-header-cell').eq(2).should('contain', 'Număr de membri');
  cy.get('th.mat-header-cell').eq(3).should('contain', 'Acțiune');
});

it('should display the join button for non-members', () => {
  cy.get('td .action-button').contains('Alătură-te').should('exist');
});

it('should display the members button for users with specific roles', () => {
  cy.get('td .action-button').contains('Membri').should('exist');
});

it('should display the delete button for users with specific roles', () => {
  cy.get('td .action-button').contains('Șterge').should('exist');
});

it('should display no groups message when there are no groups', () => {
  cy.get('.noDataRow').should('contain', 'Nu am găsit grupuri.');
});

it('should display the paginator and change pages', () => {
  cy.get('mat-paginator').should('exist');
  cy.get('mat-paginator button.mat-paginator-navigation-next').click();
});
});
