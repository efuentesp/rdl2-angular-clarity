/* PSG  Saldoscuenta Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaldoscuentaAdministrar } from './administrar/saldoscuenta-administrar';
import { SaldoscuentaAgregarForm } from './agregar/saldoscuenta-agregar-form';
import { SaldoscuentaEditarForm } from './editar/saldoscuenta-editar-form';
import { SaldoscuentaEliminarForm } from './eliminar/saldoscuenta-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: SaldoscuentaAdministrar,
  },
  {
    path: 'administrar/:id',
    component: SaldoscuentaAdministrar,
  },
  {
    path: 'agregar',
    component: SaldoscuentaAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: SaldoscuentaAgregarForm,
  },
  {
    path: 'editar/:id',
    component: SaldoscuentaEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: SaldoscuentaEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldoscuentaRoutingModule {}
