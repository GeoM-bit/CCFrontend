class Register {
  elements = {
    formFirstName: () => cy.get('#registerFirstName'),
    formLastName: () => cy.get('#registerLastName'),
    formEmail: () => cy.get('#registerEmail'),
    formPassword: () => cy.get('#registerPassword'),
    formConfirmationPassword: () => cy.get('#registerConfirmationPassword'),
    submitButton: () => cy.get('#registerSubmit')
  }

  completeForm(firstName, lastName, email, password, confirmationPassword) {
    this.elements.formFirstName().type(firstName)
    this.elements.formLastName().type(lastName)
    this.elements.formEmail().type(email)
    this.elements.formPassword().type(password)
    this.elements.formConfirmationPassword().type(confirmationPassword)
  }

  submitButton() {
    this.elements.submitButton().click();
  }
}

describe('test spec', () => {
    context('Register Testing', () => {
      const register = new Register();
      beforeEach(() => {
        cy.visit('http://localhost:4200/register')
      })

      it('Verify required validators', () => {
        register.elements.formEmail().focus().blur()
        register.elements.formPassword().focus().blur()
        register.elements.formFirstName().focus().blur()
        register.elements.formLastName().focus().blur()
        register.elements.formConfirmationPassword().focus().blur()

        cy.get('#registerFirstNameRequiredError').should('contain.text', 'Prenumele e obligatoriu!')
        cy.get('#registerLastNameRequiredError').should('contain.text','Numele e obligatoriu!')
        cy.get('#registerEmailRequiredError').should('contain.text','Adresa de email e obligatorie!')
        cy.get('#registerPasswordRequiredError').should('contain.text','Parola e obligatorie!')
        cy.get('#registerConfirmationPasswordRequiredError').should('contain.text', 'Parola de confirmare e obligatorie!')
      })

      it('Verify required validators', () => {
        register.elements.formEmail().type("plainText").blur()
        register.elements.formPassword().type("plainText").blur()
        register.elements.formFirstName().type("plain546Text").blur()
        register.elements.formLastName().type("plainTe5235xt").blur()
        register.elements.formConfirmationPassword().type("plain7Text").blur()

        cy.get('#registerEmailInvalidError').should('contain.text', 'Vă rugăm introduceți un email valid!')
        cy.get('#registerFirstNameInvalidError').should('contain.text', 'Vă rugăm introduceți un prenume valid!')
        cy.get('#registerLastNameInvalidError').should('contain.text', 'Vă rugăm introduceți un nume valid!')
        cy.get('#registerConfirmationPasswordMismatchError').should('contain.text', 'Parolele nu se potrivesc!')
        cy.get('#registerPasswordInvalidError').should('contain.text', 'Parola trebuie să aibă cel puțin 10 caractere, o literă mare, o literă mică, un număr și un simbol.')

      })

      it('Verify submit valid data', () => {
        register.completeForm(
          'firstName',
          'lastName',
          'email@teest',
          'passWord23..',
          'passWord23..',
          )
        cy.intercept({
          url: 'https://localhost:7066/api/Auth/register',
          method: 'POST'
        }).as('registerRequest')
        register.submitButton()

        cy.get('simple-snack-bar').should('be.visible')
                                          .should('contain.text', 'Contul a fost creat! Vă rugăm confirmați adresa de email!');
        cy.get('@registerRequest').its('response.statusCode').should('eq', 200)
      })

      it('Verify submit invalid data', () => {
        register.completeForm(
          'firstName',
          'lastName',
          'matei.georgiana11@gmail.com',
          'passWord23..',
          'passWord23..',
        )
        cy.intercept({
          url: 'https://localhost:7066/api/Auth/register',
          method: 'POST'
        }).as('registerRequest')
        register.submitButton()


        cy.get('simple-snack-bar').should('be.visible')
                                           .should('contain.text', 'Contul nu a putut fi creat!');
        cy.get('@registerRequest').its('response.statusCode').should('eq', 200)
      })
    })
})

