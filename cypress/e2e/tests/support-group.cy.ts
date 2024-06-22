import Login from "../classes/login";

describe('test spec', () => {
  context('Create group testing', () => {
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
    cy.get("#create-group-button").click();
    cy.get('mat-card-title').should('contain', 'Creează grup de suport');
  });

  it('should have a group name input and accept text', () => {
    cy.get("#create-group-button").click();
    cy.get('input[formControlName="groupName"]').type('Test Group').should('have.value', 'Test Group');
  });

  it('should have a description input and accept text', () => {
    cy.get("#create-group-button").click();
    cy.get('input[formControlName="description"]').type('This is a test group').should('have.value', 'This is a test group');
  });

  it('should have a members search input and accept text', () => {
    cy.get("#create-group-button").click();
    cy.get('input[placeholder="Căutați după email..."]').type('test@example.com').should('have.value', 'test@example.com');
  });

  it('should display an error if less than 2 members are selected', () => {
    cy.get("#create-group-button").click();
    cy.get('mat-checkbox').first().click();
    cy.get('mat-error').should('contain', 'Grupul trebuie să aibă cel puțin 2 membri!');
  });

  it('should enable the create button when the form is valid and at least 2 members are selected', () => {
    cy.get("#create-group-button").click();
    cy.get('input[formControlName="groupName"]').type('Test Group');
    cy.get('input[formControlName="description"]').type('This is a test group');
    cy.get('input[placeholder="Căutați după email..."]').type('test@example.com');
    cy.get('mat-checkbox').first().click();
    cy.get('input[placeholder="Căutați după email..."]').type('another@example.com');
    cy.get('mat-checkbox').eq(1).click();
    cy.get('.submit-button').should('not.be.disabled');
  });

  it('should add selected emails to the selected emails list', () => {
    cy.get("#create-group-button").click();
    cy.get('input[placeholder="Căutați după email..."]').type('test@example.com');
    cy.get('mat-checkbox').first().click();
    cy.get('.selected-emails').should('contain', 'test@example.com');
  });

  it('should remove an email from the selected emails list when the close button is clicked', () => {
    cy.get("#create-group-button").click();
    cy.get('input[placeholder="Căutați după email..."]').type('test@example.com');
    cy.get('mat-checkbox').first().click();
    cy.get('.selected-email button').click();
    cy.get('.selected-emails').should('not.contain', 'test@example.com');
  });

  it('should call the onSubmit function when the create button is clicked', () => {
    cy.get("#create-group-button").click();
    cy.get('input[formControlName="groupName"]').type('Test Group');
    cy.get('input[formControlName="description"]').type('This is a test group');
    cy.get('input[placeholder="Căutați după email..."]').type('test@example.com');
    cy.get('mat-checkbox').first().click();
    cy.get('input[placeholder="Căutați după email..."]').type('another@example.com');
    cy.get('mat-checkbox').eq(1).click();
    cy.get('.submit-button').click();
    cy.window().its('onSubmit').should('have.been.called');
  });

  it('should disable the create button if the form is invalid', () => {
    cy.get("#create-group-button").click();
    cy.get('input[formControlName="groupName"]').clear();
    cy.get('.submit-button').should('be.disabled');
  });
});
