// Form component test helpers
export const formHelpers = {
    /**
     * Selects a pet type (cat or dog)
     */
    selectPetType(type: 'cat' | 'dog') {
        cy.get(`mat-radio-button[value="${type}"]`).click();
    },

    /**
     * Fills in basic cat information
     */
    fillCatInfo(name: string, age: number, description?: string) {
        cy.get('input[formControlName="name"]').type(name);
        cy.get('input[formControlName="age"]').type(age.toString());
        if (description) {
            cy.get('textarea[formControlName="description"]').type(description);
        }
    },

    /**
     * Sets up a purebred cat with breed selection
     */
    setupPurebredCat(name: string, age: number, breed: string) {
        this.selectPetType('cat');
        this.fillCatInfo(name, age);
        cy.get('mat-checkbox[formControlName="purebred"]').click();
        cy.get('input[formControlName="bred"]').type(breed);
        cy.get('mat-option').first().click();
    },

    /**
     * Adds toys to the cat
     */
    addToys(...toys: string[]) {
        toys.forEach(toy => {
            cy.get('input[placeholder*="new-toy"]').type(`${toy}{enter}`);
        });
    },

    /**
     * Sets slider values
     */
    setSliderValues(beauty?: number, malice?: number) {
        if (beauty !== undefined) {
            cy.get('mat-slider input[formControlName="beauty"]')
                .invoke('val', beauty)
                .trigger('input');
        }
        if (malice !== undefined) {
            cy.get('mat-slider input[formControlName="malice"]')
                .invoke('val', malice)
                .trigger('input');
        }
    },

    /**
     * Submits the form and checks for snackbar
     */
    submitForm(expectSuccess = true) {
        cy.get('button[type="button"]').contains('Check').click();

        cy.get('mat-snack-bar-container').should('be.visible');
        if (expectSuccess) {
            cy.get('mat-snack-bar-container').should('contain', 'valid-form');
        } else {
            cy.get('mat-snack-bar-container').should('contain', 'invalid-form');
        }
    },
};
