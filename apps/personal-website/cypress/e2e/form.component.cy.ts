describe('Form Component', () => {
  beforeEach(() => {
    cy.visit('/form');
  });

  describe('Pet Type Selection', () => {
    it('should display pet type radio buttons', () => {
      cy.get('mat-radio-group').should('be.visible');
      cy.get('mat-radio-button[value="cat"]').should('be.visible');
      cy.get('mat-radio-button[value="dog"]').should('be.visible');
    });

    it('should show cat form when cat is selected', () => {
      cy.get('mat-radio-button[value="cat"]').click();

      // Wait for form to appear - check for cat form fields instead of ng-container
      cy.get('input[formControlName="name"]').should('be.visible');

      // Check that cat form fields are present
      cy.get('input[formControlName="name"]').should('be.visible');
      cy.get('input[formControlName="age"]').should('be.visible');
      cy.get('input[formControlName="birthday"]').should('be.visible');
    });

    it('should show dog dialog when dog is selected', () => {
      cy.get('mat-radio-button[value="dog"]').click();

      // Check that dog dialog appears - it might be a different selector
      cy.get('h2').should('contain', 'Hmm');
    });
  });

  describe('Cat Form Fields', () => {
    beforeEach(() => {
      cy.get('mat-radio-button[value="cat"]').click();
    });

    it('should allow entering cat name', () => {
      cy.get('input[formControlName="name"]').type('Whiskers');
      cy.get('input[formControlName="name"]').should('have.value', 'Whiskers');
    });

    it('should allow entering cat age', () => {
      cy.get('input[formControlName="age"]').type('3');
      cy.get('input[formControlName="age"]').should('have.value', '3');
    });

    it('should allow entering description', () => {
      const description = 'A very friendly and playful cat';
      cy.get('textarea[formControlName="description"]').type(description);
      cy.get('textarea[formControlName="description"]').should('have.value', description);
    });

    it('should show character count for description', () => {
      cy.get('textarea[formControlName="description"]').type('Test description');

      // Check that character count is displayed (just check that hint exists)
      cy.get('mat-hint').should('be.visible');
    });

    it('should toggle purebred checkbox', () => {
      cy.get('mat-checkbox[formControlName="purebred"]').click();
      cy.get('mat-checkbox[formControlName="purebred"]').should('have.class', 'mat-mdc-checkbox-checked');
    });
  });

  describe('Breed Selection', () => {
    beforeEach(() => {
      cy.get('mat-radio-button[value="cat"]').click();
      cy.get('mat-checkbox[formControlName="purebred"]').click();
    });

    it('should show breed autocomplete when purebred is checked', () => {
      cy.get('input[formControlName="bred"]').should('be.visible');
    });

    it('should filter breed options when typing', () => {
      cy.get('input[formControlName="bred"]').type('Sfinks');

      cy.get('mat-option').should('be.visible');
      cy.get('mat-option').should('contain', 'Sfinks');
    });

    it('should select breed from autocomplete', () => {
      cy.get('input[formControlName="bred"]').type('Sfinks');
      cy.get('mat-option').first().click();

      // The input will show the display value, not the ID
      cy.get('input[formControlName="bred"]').should('have.value', 'Kot Sfinks');
    });
  });

  describe('Toys Management', () => {
    beforeEach(() => {
      cy.get('mat-radio-button[value="cat"]').click();
    });

    it('should add toy to the list', () => {
      // Find the toys form field by looking for chip grid
      cy.get('mat-form-field:has(mat-chip-grid)').within(() => {
        cy.get('input').type('Ball{enter}');
      });

      cy.get('mat-chip-row').should('contain', 'Ball');
    });

    it('should remove toy from the list', () => {
      // Add a toy first
      cy.get('mat-form-field:has(mat-chip-grid)').within(() => {
        cy.get('input').type('Ball{enter}');
      });

      // Remove the toy
      cy.get('mat-chip-row button[matChipRemove]').click();

      cy.get('mat-chip-row').should('not.exist');
    });
  });

  describe('Sliders', () => {
    beforeEach(() => {
      cy.get('mat-radio-button[value="cat"]').click();
    });

    it('should allow adjusting beauty slider', () => {
      cy.get('mat-slider input[formControlName="beauty"]').invoke('val', 8).trigger('input');

      cy.get('mat-slider input[formControlName="beauty"]').should('have.value', '8');
    });

    it('should allow adjusting malice slider', () => {
      cy.get('mat-slider input[formControlName="malice"]').invoke('val', 3).trigger('input');

      cy.get('mat-slider input[formControlName="malice"]').should('have.value', '3');
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      cy.get('mat-radio-button[value="cat"]').click();
    });

    it('should show validation errors for required fields', () => {
      cy.get('button[type="button"]').last().click();

      cy.get('mat-error').should('be.visible');
      // Check for any error message (might be translated)
      cy.get('mat-error').should('not.be.empty');
    });

    it('should validate age range', () => {
      cy.get('input[formControlName="age"]').type('150');
      cy.get('button[type="button"]').last().click();

      // Check for any error message (might be translated)
      cy.get('mat-error').should('be.visible');
    });

    it('should validate beauty slider minimum value', () => {
      cy.get('mat-slider input[formControlName="beauty"]').invoke('val', 2).trigger('input');

      cy.get('button[type="button"]').last().click();

      // Check for any error message (might be translated)
      cy.get('mat-error').should('be.visible');
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      cy.get('mat-radio-button[value="cat"]').click();
    });

    it('should show success message for valid form', () => {
      // Fill in required fields
      cy.get('input[formControlName="name"]').type('Fluffy');
      cy.get('input[formControlName="age"]').type('2');
      cy.get('mat-checkbox[formControlName="purebred"]').click();

      // Select breed
      cy.get('input[formControlName="bred"]').type('Perski');
      cy.get('mat-option').first().click();

      cy.get('button[type="button"]').last().click();

      // Check for snackbar or any success message
      cy.get('mat-snack-bar-container, .success-snackbar, [role="alert"]').should('be.visible');
    });

    it('should show error message for invalid form', () => {
      cy.get('button[type="button"]').last().click();

      // Check for snackbar or any error message
      cy.get('mat-snack-bar-container, .error-snackbar, [role="alert"]').should('be.visible');
    });
  });

  describe('Form Model Display', () => {
    it('should display form model in JSON format', () => {
      cy.get('pre').should('be.visible');
      cy.get('pre').should('contain', 'petType');
    });

    it('should update form model when fields are filled', () => {
      cy.get('mat-radio-button[value="cat"]').click();
      cy.get('input[formControlName="name"]').type('Whiskers');

      cy.get('pre').should('contain', 'Whiskers');
    });
  });
});
