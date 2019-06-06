/* PSG  Parametroscomisiones Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametroscomisionesAdministrar } from './administrar/parametroscomisiones-administrar';
import { ParametroscomisionesAgregarForm } from './agregar/parametroscomisiones-agregar-form';
import { ParametroscomisionesEditarForm } from './editar/parametroscomisiones-editar-form';
import { ParametroscomisionesEliminarForm } from './eliminar/parametroscomisiones-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: ParametroscomisionesAdministrar,
  },
  {
    path: 'administrar/:id',
    component: ParametroscomisionesAdministrar,
  },
  {
    path: 'agregar',
    component: ParametroscomisionesAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: ParametroscomisionesAgregarForm,
  },
  {
    path: 'editar/:id',
    component: ParametroscomisionesEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: ParametroscomisionesEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametroscomisionesRoutingModule {}
