/* PSG  Agenda Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaAdministrar } from './administrar/agenda-administrar';
import { AgendaAgregarForm } from './agregar/agenda-agregar-form';
import { AgendaEditarForm } from './editar/agenda-editar-form';
import { AgendaEliminarForm } from './eliminar/agenda-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: AgendaAdministrar,
  },
  {
    path: 'administrar/:id',
    component: AgendaAdministrar,
  },
  {
    path: 'agregar',
    component: AgendaAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: AgendaAgregarForm,
  },
  {
    path: 'editar/:id',
    component: AgendaEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: AgendaEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaRoutingModule {}
