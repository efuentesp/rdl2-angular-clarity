/* PSG  Fideicomisario Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FideicomisarioAdministrar } from './administrar/fideicomisario-administrar';
import { FideicomisarioAgregarForm } from './agregar/fideicomisario-agregar-form';
import { FideicomisarioEditarForm } from './editar/fideicomisario-editar-form';
import { FideicomisarioEliminarForm } from './eliminar/fideicomisario-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: FideicomisarioAdministrar,
  },
  {
    path: 'administrar/:id',
    component: FideicomisarioAdministrar,
  },
  {
    path: 'agregar',
    component: FideicomisarioAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: FideicomisarioAgregarForm,
  },
  {
    path: 'editar/:id',
    component: FideicomisarioEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: FideicomisarioEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FideicomisarioRoutingModule {}
