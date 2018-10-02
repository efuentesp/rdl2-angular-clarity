import AddBeneficiario from '../pageobject/beneficiario/addbeneficiario.js';
import EditBeneficiario from '../pageobject/beneficiario/editbeneficiario.js';
import DeleteBeneficiario from '../pageobject/beneficiario/deletebeneficiario.js';
import SearchBeneficiario from '../pageobject/beneficiario/searchbeneficiario.js';

describe('Prueba Beneficiario', function() {
  const add = new AddBeneficiario();
  const edit = new EditBeneficiario();
  const remove = new DeleteBeneficiario();
  const search = new SearchBeneficiario();

  it('Agregar Beneficiario', function() {
    add.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    add.goToMenu();
    add.add({
      f_curp: 'XYZA101189ABCDEF12',
      f_nombre: 'Georgina',
      f_apellidopaterno: 'Vázquez',
      f_apellidomaterno: 'López',
      f_fechanacimiento: '13/04/2018',
      m_afiliado1Id: '1',
    });
    add.validateMessage();
  });

  it('Editar Beneficiario', function() {
    edit.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    edit.goToMenu();
    edit.edit({
      f_curp: 'GEVL140489ABCDEF12',
      f_nombre: 'Georgina',
      f_apellidopaterno: 'Velázquez',
      f_apellidomaterno: 'López',
      f_fechanacimiento: '14/04/1989',
      m_afiliado1Id: '2',
    });
    edit.validateMessage();
  });

  it('Eliminar Beneficiario', function() {
    remove.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    remove.goToMenu();
    remove.remove({
      f_curp: 'GEVL140489ABCDEF12',
      f_nombre: 'Georgina',
      f_apellidopaterno: 'Velázquez',
      f_apellidomaterno: 'López',
      f_fechanacimiento: '14/04/1989',
      m_afiliado1Id: '1',
    });
    remove.validateMessage();
  });

  it('Buscar Beneficiario', function() {
    search.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    search.goToMenu();
    search.add({
      f_curp: 'XYZA101189ABCDEF12',
      f_nombre: 'Georgina',
      f_apellidopaterno: 'Vázquez',
      f_apellidomaterno: 'López',
      f_fechanacimiento: '13/04/2018',
      m_afiliado1Id: '1',
    });
    search.edit({
      f_curp: 'GEVL140489ABCDEF12',
      f_nombre: 'Georgina',
      f_apellidopaterno: 'Velázquez',
      f_apellidomaterno: 'López',
      f_fechanacimiento: '14/04/1989',
      m_afiliado1Id: '2',
    });
    search.remove({
      f_curp: 'GEVL140489ABCDEF12',
      f_nombre: 'Georgina',
      f_apellidopaterno: 'Velázquez',
      f_apellidomaterno: 'López',
      f_fechanacimiento: '14/04/1989',
      m_afiliado1Id: '1',
    });
  });
});
