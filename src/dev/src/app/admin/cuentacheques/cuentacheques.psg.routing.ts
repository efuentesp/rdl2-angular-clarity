/* PSG  Cuentacheques Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentachequesAdministrar } from './administrar/cuentacheques-administrar';
import { CuentachequesAgregarForm } from './agregar/cuentacheques-agregar-form';
import { CuentachequesEditarForm } from './editar/cuentacheques-editar-form';
import { CuentachequesEliminarForm } from './eliminar/cuentacheques-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: CuentachequesAdministrar,
  },
  {
    path: 'administrar/:id',
    component: CuentachequesAdministrar,
  },
  {
    path: 'agregar',
    component: CuentachequesAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: CuentachequesAgregarForm,
  },
  {
    path: 'editar/:id',
    component: CuentachequesEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: CuentachequesEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentachequesRoutingModule {}
