/* PSG  Aportaciones Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AportacionesAdministrar } from './administrar/aportaciones-administrar';
import { AportacionesAgregarForm } from './agregar/aportaciones-agregar-form';
import { AportacionesEditarForm } from './editar/aportaciones-editar-form';
import { AportacionesEliminarForm } from './eliminar/aportaciones-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: AportacionesAdministrar,
  },
  {
    path: 'administrar/:id',
    component: AportacionesAdministrar,
  },
  {
    path: 'agregar',
    component: AportacionesAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: AportacionesAgregarForm,
  },
  {
    path: 'editar/:id',
    component: AportacionesEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: AportacionesEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AportacionesRoutingModule {}
