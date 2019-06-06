/* PSG  Accionista Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccionistaAdministrar } from './administrar/accionista-administrar';
import { AccionistaAgregarForm } from './agregar/accionista-agregar-form';
import { AccionistaEditarForm } from './editar/accionista-editar-form';
import { AccionistaEliminarForm } from './eliminar/accionista-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: AccionistaAdministrar,
  },
  {
    path: 'administrar/:id',
    component: AccionistaAdministrar,
  },
  {
    path: 'agregar',
    component: AccionistaAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: AccionistaAgregarForm,
  },
  {
    path: 'editar/:id',
    component: AccionistaEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: AccionistaEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccionistaRoutingModule {}
