import Login from "../classes/login";

describe('Counseling requests table', () => {
  beforeEach(()=>{
    const login = new Login();
    cy.visit('http://localhost:4200/login');
    login.completeForm(
      'anca.dinea@gmail.com',
      'uNsnaPSpitte2.')
    login.submitButton();
    cy.wait(2000);
    cy.get('#counselingRequestsTable').click();
  })

  it('should display the data in the table', () => {
    cy.get('thead', ).should('be.visible');
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should display correct data in the columns', () => {
    cy.get('tbody tr').eq(3).within(() => {
      cy.get('td.mat-column-requesterEmail').should('contain.text', 'matei.georgiana11@gmail.com');
      cy.get('td.mat-column-requesterName').should('contain.text', 'Georgiana Matei');
      cy.get('td.mat-column-description').should('contain.text', 'Aici introduc detalii');
      cy.get('td.mat-column-isPersonal').should('contain.text', 'DA');
      cy.get('td.mat-column-availability').should('contain.text', 'Luni: 08:00 - 10:00');
      cy.get('td.mat-column-status').should('contain.text', 'Nepreluată');
    });
  });

  it('should sort by requester email', () => {
    let firstCellValue = "";
    cy.get('td.mat-column-requesterEmail').then($cell => {
      firstCellValue = $cell.text();
    });
    cy.get('thead tr').contains('Adresa de email a solicitorului').click();
    cy.get('tbody tr').first().within(() => {
          cy.get('td.mat-column-requesterEmail').should($newCell => {
            let secondCellValue = $newCell.text();
            expect(secondCellValue).not.to.equal(firstCellValue);
      });
    });
  });

  it('should trigger accept action', () => {
    cy.get('tbody tr').first().within(() => {
      cy.get('#acceptRequestButton').click({force: true});
    });

    cy.get('mat-card').within(() => {
      cy.get('input[formControlName="startDateTime"]').click();
      cy.get('tbody tr td span').contains('29').click();
      cy.get('owl-date-time-calendar').contains('owl-date-time-month-view').contains('JUN').click();
      cy.get('owl-date-time-calendar').contains('owl-date-time-month-view', '31').click();
      cy.get('button[color="accent"]').click();

      cy.get('.mat-dialog-container').should('not.exist');
    });
  });

  it('should trigger reject action', () => {
    cy.get('tbody tr').first().within(() => {
      cy.get('#rejectRequestButton').click({force: true});
    });
    cy.get('mat-card').should('be.visible');
    cy.get('textarea').type('Motivul respingerii solicitării');
    cy.get('#rejectButton').click();
    cy.get('simple-snack-bar', {timeout: 5000}).should('be.visible')
      .should('contain.text', 'Cererea a fost refuzată!');
  });

});
