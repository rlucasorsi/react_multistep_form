class ReviewPage {
  elements = {
    radioOption: (option) => cy.get(`[data-cy="radio-${option}"]`),
    commentInput: () => cy.get('[data-cy="input-comment"]'),
    nextBtn: () => cy.get('[data-cy="btn-next"]'),
    backBtn: () => cy.get('[data-cy="btn-back"]'),
    form: () => cy.get('[data-cy="review-form"]'),
  };

  fillForm(review, comment) {
    if (review) {
      this.elements.radioOption(review).click();
    }
    if (comment) {
      this.elements.commentInput().clear().type(comment);
    }
  }

  clickNext() {
    this.elements.nextBtn().click();
  }

  clickBack() {
    this.elements.backBtn().click();
  }

  isAtStep() {
    this.elements.form().should('be.visible');
  }

  isNotAtStep() {
    this.elements.form().should('not.exist');
  }
}

export default new ReviewPage();
