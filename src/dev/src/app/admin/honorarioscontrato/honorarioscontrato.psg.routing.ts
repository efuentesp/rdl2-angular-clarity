/* PSG  Honorarioscontrato Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HonorarioscontratoAdministrar } from './administrar/honorarioscontrato-administrar';
import { HonorarioscontratoAgregarForm } from './agregar/honorarioscontrato-agregar-form';
import { HonorarioscontratoEditarForm } from './editar/honorarioscontrato-editar-form';
import { HonorarioscontratoEliminarForm } from './eliminar/honorarioscontrato-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: HonorarioscontratoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: HonorarioscontratoAdministrar,
  },
  {
    path: 'agregar',
    component: HonorarioscontratoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: HonorarioscontratoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: HonorarioscontratoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: HonorarioscontratoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HonorarioscontratoRoutingModule {}
