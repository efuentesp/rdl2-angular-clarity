import AddAfiliado from '../pageobject/afiliado/addafiliado.js';
import EditAfiliado from '../pageobject/afiliado/editafiliado.js';
import DeleteAfiliado from '../pageobject/afiliado/deleteafiliado.js';
import SearchAfiliado from '../pageobject/afiliado/searchafiliado.js';

describe('Prueba Afiliado', function() {
  const add = new AddAfiliado();
  const edit = new EditAfiliado();
  const remove = new DeleteAfiliado();
  const search = new SearchAfiliado();

  it('Agregar Afiliado', function() {
    add.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    add.goToMenu();
    add.add({
      f_nss: '123456',
      f_nombre: 'Juan',
      f_apellidopaterno: 'Pérez',
      f_apellidomaterno: 'González',
      s_genero1Id: 'Masculino',
      f_observaciones: 'Estás son las observaciones',
      f_fechaafiliacion: '09/26/2018',
      f_correo: 'jperez@softtek.com',
      f_semanascotizadas: '4',
      f_numero: '346',
      fl_foto: 'foto_test.png',
      fl_actanacimiento: 'foto_test.png',
    });
    add.validateMessage();
  });

  it('Editar Afiliado', function() {
    edit.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    edit.goToMenu();
    edit.edit({
      f_nss: '567890',
      f_nombre: 'Silvia',
      f_apellidopaterno: 'Pérez',
      f_apellidomaterno: 'Silva',
      s_genero1Id: 'Femenino',
      f_observaciones: 'Estás son las observaciones',
      f_fechaafiliacion: '09/25/2018',
      f_correo: 'silvia.perez@softtek.com',
      f_semanascotizadas: '5',
      f_numero: '346',
      fl_foto: 'foto_test.png',
      fl_actanacimiento: 'foto_test.png',
    });
    edit.validateMessage();
  });

  it('Eliminar Afiliado', function() {
    remove.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    remove.goToMenu();
    remove.remove({
      f_nss: '567890',
      f_nombre: 'Silvia',
      f_apellidopaterno: 'Pérez',
      f_apellidomaterno: 'Silva',
      s_genero1Id: 'Femenino',
      f_observaciones: 'Estás son las observaciones',
      f_fechaafiliacion: '09/25/2018',
      f_correo: 'silvia.perez@softtek.com',
      f_semanascotizadas: '5',
      f_numero: '346',
      fl_foto: 'foto_test.png',
      fl_actanacimiento: 'foto_test.png',
    });
    remove.validateMessage();
  });

  it('Buscar Afiliado', function() {
    search.login(Cypress.env('admin_user'), Cypress.env('admin_password'));
    search.goToMenu();
    search.add({
      f_nss: '123456',
      f_nombre: 'Juan',
      f_apellidopaterno: 'Pérez',
      f_apellidomaterno: 'González',
      s_genero1Id: 'Masculino',
      f_observaciones: 'Estás son las observaciones',
      f_fechaafiliacion: '09/26/2018',
      f_correo: 'jperez@softtek.com',
      f_semanascotizadas: '4',
      f_numero: '346',
      fl_foto: 'foto_test.png',
      fl_actanacimiento: 'foto_test.png',
    });
    search.edit({
      f_nss: '567890',
      f_nombre: 'Silvia',
      f_apellidopaterno: 'Pérez',
      f_apellidomaterno: 'Silva',
      s_genero1Id: 'Femenino',
      f_observaciones: 'Estás son las observaciones',
      f_fechaafiliacion: '09/25/2018',
      f_correo: 'silvia.perez@softtek.com',
      f_semanascotizadas: '5',
      f_numero: '346',
      fl_foto: 'foto_test.png',
      fl_actanacimiento: 'foto_test.png',
    });
    search.remove({
      f_nss: '567890',
      f_nombre: 'Silvia',
      f_apellidopaterno: 'Pérez',
      f_apellidomaterno: 'Silva',
      s_genero1Id: 'Femenino',
      f_observaciones: 'Estás son las observaciones',
      f_fechaafiliacion: '09/25/2018',
      f_correo: 'silvia.perez@softtek.com',
      f_semanascotizadas: '5',
      f_numero: '346',
      fl_foto: 'foto_test.png',
      fl_actanacimiento: 'foto_test.png',
    });
    search.goToRelationship('Beneficiario');
  });
});
