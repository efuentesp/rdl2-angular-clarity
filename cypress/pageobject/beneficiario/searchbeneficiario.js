import EditBeneficiario from './editbeneficiario.js';
import DeleteBeneficiario from './deletebeneficiario.js';
import AddBeneficiario from './addbeneficiario.js';
import Common from './common.js';

export default class SearchBeneficiario extends Common {
  add(values) {
    const a = new AddBeneficiario();
    a.add(values);
    a.validateMessage();
  }

  edit(values) {
    const e = new EditBeneficiario();
    e.edit(values);
    e.validateMessage();
  }

  remove(values) {
    const r = new DeleteBeneficiario();
    r.remove(values);
    r.validateMessage();
  }

  goToRelationship(relationshipName) {
    var regex = new RegExp('\\b' + relationshipName + '\\b');

    cy.get('div.datagrid-body').within(() => {
      cy
        .get('.datagrid-row')
        .last()
        .within(() => {
          cy
            .get('button')
            .contains(regex)
            .click({ force: true });
        });
    });
  }
}
