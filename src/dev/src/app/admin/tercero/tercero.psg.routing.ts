/* PSG  Tercero Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerceroAdministrar } from './administrar/tercero-administrar';
import { TerceroAgregarForm } from './agregar/tercero-agregar-form';
import { TerceroEditarForm } from './editar/tercero-editar-form';
import { TerceroEliminarForm } from './eliminar/tercero-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: TerceroAdministrar,
  },
  {
    path: 'administrar/:id',
    component: TerceroAdministrar,
  },
  {
    path: 'agregar',
    component: TerceroAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: TerceroAgregarForm,
  },
  {
    path: 'editar/:id',
    component: TerceroEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: TerceroEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerceroRoutingModule {}
