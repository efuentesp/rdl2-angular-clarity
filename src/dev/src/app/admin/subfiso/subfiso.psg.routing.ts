/* PSG  Subfiso Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubfisoAdministrar } from './administrar/subfiso-administrar';
import { SubfisoAgregarForm } from './agregar/subfiso-agregar-form';
import { SubfisoEditarForm } from './editar/subfiso-editar-form';
import { SubfisoEliminarForm } from './eliminar/subfiso-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: SubfisoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: SubfisoAdministrar,
  },
  {
    path: 'agregar',
    component: SubfisoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: SubfisoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: SubfisoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: SubfisoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubfisoRoutingModule {}
