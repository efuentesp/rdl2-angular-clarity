/* PSG  Pagos Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosAdministrar } from './administrar/pagos-administrar';
import { PagosAgregarForm } from './agregar/pagos-agregar-form';
import { PagosEditarForm } from './editar/pagos-editar-form';
import { PagosEliminarForm } from './eliminar/pagos-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: PagosAdministrar,
  },
  {
    path: 'administrar/:id',
    component: PagosAdministrar,
  },
  {
    path: 'agregar',
    component: PagosAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: PagosAgregarForm,
  },
  {
    path: 'editar/:id',
    component: PagosEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: PagosEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosRoutingModule {}
