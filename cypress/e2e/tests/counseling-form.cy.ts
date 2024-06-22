import Login from "../classes/login";

describe('Counseling request form', () => {
  beforeEach(()=>{
    const login = new Login();
    cy.visit('http://localhost:4200/login');
    login.completeForm(
      'alina.banea@gmail.com',
      'uNsnaPSpitte2.')
    login.submitButton();
    cy.get('#requestCounselingEntry').click();
  })

  it('should select personal problem option', () => {
    cy.get('#radioPersonal').click();
    cy.get('#radioPersonal input[type="radio"]').should('be.checked');
  });

  it('should select problem about someone else option', () => {
    cy.get('#radioNotPersonal').click();
    cy.get('#radioNotPersonal input[type="radio"]').should('be.checked');
  });

  it('should show error if description is missing', () => {
    cy.get('#details').focus().blur();
    cy.get('#detailsError').should('be.visible').and('contain.text', 'Descrierea este obligatorie!');
  });

  it('should show error if counseling type is not selected', () => {
    cy.get('form').submit();
    cy.get('#counselingTypeError').should('be.visible').and('contain.text', 'Tipul de consiliere este obligatoriu!');
  });

  it('should select counseling type and submit the form', () => {
    cy.get('#radioPersonal').click();
    cy.get('#details').type('This is a test description.');
    cy.get('mat-select[formControlName="counselingType"]').click();
    cy.get('#doctorOption').click();
    cy.get('form').submit();
    cy.get('#personalError').should('not.exist');
    cy.get('#detailsError').should('not.exist');
    cy.get('#counselingTypeError').should('not.exist');
  });

  it('should select doctor as counseling type', () => {
    cy.get('mat-select[formControlName="counselingType"]').click();
    cy.get('#doctorOption').click();
    cy.get('mat-select[formControlName="counselingType"]').should('contain', 'Medic');
  });

  it('should select psychologist as counseling type', () => {
    cy.get('mat-select[formControlName="counselingType"]').click();
    cy.get('#psychologistOption').click();
    cy.get('mat-select[formControlName="counselingType"]').should('contain', 'Psiholog');
  });

  it('should add availability hours for Monday', () => {
    cy.get('mat-select[formControlName="startHour"]').first().click();
    cy.get('mat-option').contains('08:00').click();

    cy.get('mat-select[formControlName="endHour"]').first().click();
    cy.get('mat-option').contains('10:00').click();

    cy.get('mat-select[formControlName="startHour"]').first().should('contain', '08:00');
    cy.get('mat-select[formControlName="endHour"]').first().should('contain', '10:00');
  });

  it('should show validation error if start hour is not selected', () => {
    cy.get('mat-select[formControlName="endHour"]').first().click();
    cy.get('mat-option').contains('10:00').click();
    cy.get('form').submit();
    cy.get('.availability-row').first().find('mat-error').contains('Ora de început este obligatorie!');
  });

  it('should show validation error if end hour is not selected', () => {
    cy.get('mat-select[formControlName="startHour"]').first().click();
    cy.get('mat-option').contains('08:00').click();
    cy.get('form').submit();
    cy.get('.availability-row').first().find('mat-error').contains('Ora de sfârșit este obligatorie!');
  });

  it('should show validation error if start hour is after end hour', () => {
    cy.get('mat-select[formControlName="startHour"]').first().click();
    cy.get('mat-option').contains('10:00').click();

    cy.get('mat-select[formControlName="endHour"]').first().click();
    cy.get('mat-option').contains('08:00').click();

    cy.get('form').submit();
    cy.get('.availability-row').first().find('mat-error').contains('Ora de început trebuie să fie înaintea orei de sfârșit!');
  });

  it('should submit the form with valid availability', () => {
    cy.get('#radioPersonal input[type="radio"]').click();
    cy.get('#details').type('This is a test description.');
    cy.get('mat-select[formControlName="counselingType"]').click();
    cy.get('#doctorOption').click();

    cy.get('mat-select[formControlName="startHour"]').first().click();
    cy.get('mat-option').contains('08:00').click();
    cy.get('mat-select[formControlName="endHour"]').first().click();
    cy.get('mat-option').contains('10:00').click();

    cy.get('form').submit();
    cy.get('simple-snack-bar').should('be.visible')
      .should('contain.text', 'Solicitarea a fost trimisă! În curând veți fi contactat de un consilier.');
  });
});
