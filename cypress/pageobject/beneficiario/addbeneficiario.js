import Common from './common.js';

export default class AddBeneficiario extends Common {
  add(values) {
    cy
      .get('button')
      .contains(/\bAgregar\b/)
      .click();

    cy.url().should('contain', '/Beneficiario/agregar');

    Object.keys(values).forEach(function(key) {
      if (key.split('_')[0] == 'f') {
        cy.get('#' + key.split('_')[1]).type(values[key]);
      } else if (key.split('_')[0] == 's') {
        cy.get('#' + key.split('_')[1]).within(() => {
          cy
            .get('clr-radio-wrapper')
            .contains(values[key])
            .within(() => {
              cy.get('input[type="radio"]').check();
            });
        });
      } else if (key.split('_')[0] == 'm') {
        cy.get('div#' + key.split('_')[1]).within(() => {
          cy.get('button > clr-icon[shape="search"]').click();
        });

        cy.get('clr-modal').as('modal');
        cy.get('@modal').within(() => {
          cy.get('div.modal-body').within(() => {
            cy
              .get('clr-dg-row')
              .eq(parseInt(values[key]) - 1)
              .as('row');
            cy.get('@row').within(() => {
              cy.get('input[type="radio"]').check();
            });
          });

          cy.get('div.modal-footer').within(() => {
            cy
              .get('button')
              .contains(/\bElegir\b/)
              .click();
          });
        });
      } else if (key.split('_')[0] == 'fl') {
        cy.uploadFile('#' + key.split('_')[1], values[key]);
      }
    });

    cy
      .get('button')
      .contains(/\bAgregar\b/)
      .click();
  }

  validateMessage() {
    cy
      .get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content')
      .should('contain', 'Etiquetaasignada save successfully.');

    cy.wait(1000);

    cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click();
  }
}
