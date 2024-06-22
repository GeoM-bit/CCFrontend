import Login from "../classes/login";

describe('CalendarEventDialogComponent', () => {

  beforeEach(()=>{
    const login = new Login();
    cy.visit('http://localhost:4200/login');
    login.completeForm(
      'matei.georgiana11@gmail.com',
      'uNsnaPSpitte2.')
    login.submitButton();
    cy.get('#calendarEntry').click();
    cy.get("#create-event-button").click();
  })

  afterEach(()=>{
    cy.get('body').click(0, 0);
  })

  it('should display the correct title', () => {
    cy.get('mat-card-title').contains('Creează un eveniment');
  });

  it('should select the first 2 email items', () => {
    cy.get('mat-list.email-list mat-list-item.email-item')
      .should('have.length.greaterThan', 1)
      .each(($el, index) => {
        if (index < 2) {
          cy.wrap($el).find('mat-checkbox input[type="checkbox"]').click();
        }
      });

    cy.get('mat-list.email-list mat-list-item.email-item')
      .each(($el, index) => {
        if (index < 2) {
          cy.wrap($el).find('mat-checkbox input[type="checkbox"]').should('be.checked');
        }
      });
  });

  it('should display an error message if fewer than 2 participants are selected', () => {
    cy.get('mat-list.email-list mat-list-item.email-item')
      .should('have.length.greaterThan', 1);
    cy.get('#emailsError').should('contain.text', 'Evenimentul trebuie să aibă cel puțin 2 participanți!');

    cy.get('mat-list.email-list mat-list-item.email-item').first()
      .find('mat-checkbox input[type="checkbox"]').click();

    cy.get('#emailsError').should('contain.text', 'Evenimentul trebuie să aibă cel puțin 2 participanți!');
  });

  it('should select a group from the dropdown', () => {
    cy.get('#participantsOptionSupportGroup').click();
    cy.get('mat-select').click();
    cy.get('mat-option').contains('cervical cancer support').click();
    cy.get('#groupSelector').should('contain', 'cervical cancer support');
  });

  it('should open date picker and select a valid date', () => {
    cy.get('#calendarEventStartDateTime').click();
    cy.get('owl-date-time-container').should('be.visible');
    cy.get('.owl-dt-calendar-cell-content').contains('19').click();
    cy.get('owl-date-time-container button').contains('Set').click();
    cy.get('#startDateTimeInput').should('contain.value', '19.06.2024');
    cy.get('#calendarEventDateInvalidError').should('not.exist');
    cy.get('#calendarEventMissingDate').should('not.exist');
    cy.get('#calendarEventPastDate').should('not.exist');
  });

  it('should show error if date is missing', () => {
    cy.get('#startDateTimeInput').focus().blur();
    cy.get('#calendarEventMissingDate').should('be.visible').and('contain.text', 'Data de început este obligatorie!');
  });
});
