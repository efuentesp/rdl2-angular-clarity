/* PSG  Fideicomitente Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FideicomitenteAdministrar } from './administrar/fideicomitente-administrar';
import { FideicomitenteAgregarForm } from './agregar/fideicomitente-agregar-form';
import { FideicomitenteEditarForm } from './editar/fideicomitente-editar-form';
import { FideicomitenteEliminarForm } from './eliminar/fideicomitente-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: FideicomitenteAdministrar,
  },
  {
    path: 'administrar/:id',
    component: FideicomitenteAdministrar,
  },
  {
    path: 'agregar',
    component: FideicomitenteAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: FideicomitenteAgregarForm,
  },
  {
    path: 'editar/:id',
    component: FideicomitenteEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: FideicomitenteEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FideicomitenteRoutingModule {}
