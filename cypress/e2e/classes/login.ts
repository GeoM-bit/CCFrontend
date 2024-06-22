class Login {
  elements = {
    formEmail: () => cy.get('#loginEmail'),
    formPassword: () => cy.get('#loginPassword'),
    submitButton: () => cy.get('#submitLogin')
  }

  completeForm(email, password) {
    this.elements.formEmail().type(email)
    this.elements.formPassword().type(password)
  }

  submitButton() {
    this.elements.submitButton().click();
  }
}

export default Login;
