import Login from "../classes/login";

describe('test spec', () => {
  context('User management testing', () => {
    const login = new Login();
    beforeEach(() => {
      cy.visit('http://localhost:4200/login')
      login.completeForm(
        'matei.georgiana11@gmail.com',
        'uNsnaPSpitte2.')
      login.submitButton();
      cy.get('#userManagementEntry').click();
    });
  });
  it('should load the page with the correct title', () => {
    cy.get('.page-title').should('contain', 'Utilizatori');
  });

  it('should display the correct table headers', () => {
    cy.get('th.mat-header-cell').eq(0).should('contain', 'Prenume');
    cy.get('th.mat-header-cell').eq(1).should('contain', 'Nume');
    cy.get('th.mat-header-cell').eq(2).should('contain', 'Adresa de email');
    cy.get('th.mat-header-cell').eq(3).should('contain', 'Email confirmat');
    cy.get('th.mat-header-cell').eq(4).should('contain', 'Rol');
    cy.get('th.mat-header-cell').eq(5).should('contain', 'Acțiuni');
  });

  it('should display user data in the table', () => {
    cy.get('td.mat-cell').should('contain', 'Prenume');
    cy.get('td.mat-cell').should('contain', 'Nume');
    cy.get('td.mat-cell').should('contain', 'Adresa de email');
    cy.get('td.mat-cell').should('contain', 'Email confirmat');
    cy.get('td.mat-cell').should('contain', 'Rol');
  });

  it('should display delete and edit buttons for each user', () => {
    cy.get('button').contains('Șterge').should('exist');
    cy.get('button').contains('Editează').should('exist');
  });

  it('should display a message when no users are found', () => {
    cy.get('.noDataRow').should('contain', 'Nu au fost găsiți utilizatori.');
  });

  it('should open delete confirmation when delete button is clicked', () => {
    cy.get('button').contains('Șterge').first().click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Are you sure you want to delete this user?');
    });
  });

  it('should open edit user dialog when edit button is clicked', () => {
    cy.get('button').contains('Editează').first().click();
    cy.get('.mat-dialog-container').should('be.visible');
  });

  it('should sort users by first name when the first name header is clicked', () => {
    cy.get('th.mat-header-cell').contains('Prenume').click();
    cy.get('td.mat-cell').eq(0).should('contain', 'A');
    cy.get('th.mat-header-cell').contains('Prenume').click();
    cy.get('td.mat-cell').eq(0).should('contain', 'Z');
  });

  it('should display the paginator and change pages', () => {
    cy.get('mat-paginator').should('exist');
    cy.get('mat-paginator button.mat-paginator-navigation-next').click();
  });

  it('should display the correct roles for users', () => {
    cy.get('td.mat-cell').should('contain', 'Admin');
    cy.get('td.mat-cell').should('contain', 'User');
  });

  it('should load the page with the correct title', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('mat-card-title').should('contain', 'Editează utilizator');
  });

  it('should have a first name input and accept text', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="firstName"]').type('John').should('have.value', 'John');
  });

  it('should show error for invalid first name', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="firstName"]').clear();
    cy.get('input[formControlName="firstName"]').type(' ').blur();
    cy.get('mat-error').should('contain', 'Vă rugăm introduceți un prenume valid!');
    cy.get('input[formControlName="firstName"]').clear().blur();
    cy.get('mat-error').should('contain', 'Prenumele e obligatoriu!');
  });

  it('should have a last name input and accept text', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="lastName"]').type('Doe').should('have.value', 'Doe');
  });

  it('should show error for invalid last name', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="lastName"]').clear();
    cy.get('input[formControlName="lastName"]').type(' ').blur();
    cy.get('mat-error').should('contain', 'Vă rugăm introduceți un nume valid!');
    cy.get('input[formControlName="lastName"]').clear().blur();
    cy.get('mat-error').should('contain', 'Numele e obligatoriu!');
  });

  it('should have an email input and accept text', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="email"]').type('john.doe@example.com').should('have.value', 'john.doe@example.com');
  });

  it('should show error for invalid email', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="email"]').clear();
    cy.get('input[formControlName="email"]').type('invalid-email').blur();
    cy.get('mat-error').should('contain', 'Vă rugăm introduceți un email valid!');
    cy.get('input[formControlName="email"]').clear().blur();
    cy.get('mat-error').should('contain', 'Adresa de email e obligatorie!');
  });

  it('should have email confirmed radio buttons', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('mat-radio-group[formControlName="emailConfirmed"]').should('exist');
    cy.get('mat-radio-button[value="true"]').should('exist');
    cy.get('mat-radio-button[value="false"]').should('exist');
  });

  it('should have a role select input and accept selection', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('mat-select[formControlName="role"]').click();
    cy.get('mat-option').contains('Administrator').click();
    cy.get('mat-select[formControlName="role"]').should('contain', 'Administrator');
  });

  it('should show error for unselected role', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('mat-select[formControlName="role"]').click();
    cy.get('mat-option').contains('Membru').click();
    cy.get('mat-select[formControlName="role"]').clear().blur();
    cy.get('mat-error').should('contain', 'Rolul este obligatoriu!');
  });

  it('should enable the submit button when the form is valid', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="firstName"]').type('John');
    cy.get('input[formControlName="lastName"]').type('Doe');
    cy.get('input[formControlName="email"]').type('john.doe@example.com');
    cy.get('mat-radio-button[value="true"]').click();
    cy.get('mat-select[formControlName="role"]').click();
    cy.get('mat-option').contains('Administrator').click();
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should call the onSubmit function when the submit button is clicked', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="firstName"]').type('John');
    cy.get('input[formControlName="lastName"]').type('Doe');
    cy.get('input[formControlName="email"]').type('john.doe@example.com');
    cy.get('mat-radio-button[value="true"]').click();
    cy.get('mat-select[formControlName="role"]').click();
    cy.get('mat-option').contains('Administrator').click();
    cy.get('button[type="submit"]').click();
    cy.window().its('onSubmit').should('have.been.called');
  });

  it('should disable the submit button if the form is invalid', () => {
    cy.get('tr.mat-row').first().within(() => {
      cy.get('button').contains('Editează').click();
    });
    cy.get('input[formControlName="firstName"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
