/* PSG  Guia Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiaAdministrar } from './administrar/guia-administrar';
import { GuiaAgregarForm } from './agregar/guia-agregar-form';
import { GuiaEditarForm } from './editar/guia-editar-form';
import { GuiaEliminarForm } from './eliminar/guia-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: GuiaAdministrar,
  },
  {
    path: 'administrar/:id',
    component: GuiaAdministrar,
  },
  {
    path: 'agregar',
    component: GuiaAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: GuiaAgregarForm,
  },
  {
    path: 'editar/:id',
    component: GuiaEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: GuiaEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiaRoutingModule {}
