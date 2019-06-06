/* PSG  Retiro Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetiroAdministrar } from './administrar/retiro-administrar';
import { RetiroAgregarForm } from './agregar/retiro-agregar-form';
import { RetiroEditarForm } from './editar/retiro-editar-form';
import { RetiroEliminarForm } from './eliminar/retiro-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: RetiroAdministrar,
  },
  {
    path: 'administrar/:id',
    component: RetiroAdministrar,
  },
  {
    path: 'agregar',
    component: RetiroAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: RetiroAgregarForm,
  },
  {
    path: 'editar/:id',
    component: RetiroEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: RetiroEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetiroRoutingModule {}
