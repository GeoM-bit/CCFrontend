import Login from "../classes/login";

describe('test spec', () => {
  context('Profile testing', () => {
    const login = new Login();
    beforeEach(() => {
      cy.visit('http://localhost:4200/login')
      login.completeForm(
        'matei.georgiana11@gmail.com',
        'uNsnaPSpitte2.')
      login.submitButton();
      cy.get('#profileEntry').click();
    });

  it('should display profile information correctly', () => {
    cy.get('.card-body').first().within(() => {
      cy.get('h4').should('contain.text', 'Georgiana Matei');
      cy.get('.text-secondary').should('contain.text', "matei.georgiana11@gmail.com");
      cy.get('#deletePhoto').should('be.visible');
    });
  });

  it.only('should allow editing profile details', () => {
    const newFirstName = 'NewFirstName';
    const newLastName = 'NewLastName';
    cy.get("#detailsPanel").click();
    cy.get('#firstNameInput').should('have.value', 'Georgiana');
    cy.get('#lastNameInput').should('have.value', 'Matei');
    cy.get('#emailInput').should('have.value', 'matei.georgiana11@gmail.com');

    cy.get('#accountType').should('have.value','Admin');
    cy.get('#firstNameInput').clear().type(newFirstName);
    cy.get('#lastNameInput').clear().type(newLastName);

    cy.get('.button-container').within(() => {
      cy.get('button').contains('Modifică').click();
    });
    cy.get('.mat-snack-bar-container').should('be.visible').contains('Detaliile profilului au fost actualizate cu succes!');
    cy.get('mat-form-field').contains('Prenume').find('input').should('have.value', newFirstName);
    cy.get('mat-form-field').contains('Nume').find('input').should('have.value', newLastName);
  });

  it('should allow changing password', () => {
    const oldPassword = 'oldPassword123';
    const newPassword = 'newPassword456';

    cy.get('mat-form-field').contains('Parola veche').find('input').type(oldPassword);
    cy.get('mat-form-field').contains('Parola nouă').find('input').type(newPassword);
    cy.get('mat-form-field').contains('Reintroduceți parola nouă').find('input').type(newPassword);
    cy.get('.button-container').within(() => {
      cy.get('button').contains('Modifică').click();
    });
    cy.get('.mat-snack-bar-container').should('be.visible').contains('Parola a fost schimbată cu succes!');
  });

  it('should handle cancelling profile details edit', () => {
    const newFirstName = 'NewFirstName';
    const newLastName = 'NewLastName';

    cy.get('mat-form-field').contains('Prenume').find('input').clear().type(newFirstName);
    cy.get('mat-form-field').contains('Nume').find('input').clear().type(newLastName);
    cy.get('.button-container').within(() => {
      cy.get('button').contains('Anulează').click();
    });
    cy.get('mat-form-field').contains('Prenume').find('input').should('have.value', 'Georgiana');
    cy.get('mat-form-field').contains('Nume').find('input').should('have.value', 'Matei');
  });
  });
})

