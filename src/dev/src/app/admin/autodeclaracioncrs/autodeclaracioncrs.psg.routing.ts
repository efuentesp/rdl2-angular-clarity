/* PSG  Autodeclaracioncrs Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutodeclaracioncrsAdministrar } from './administrar/autodeclaracioncrs-administrar';
import { AutodeclaracioncrsAgregarForm } from './agregar/autodeclaracioncrs-agregar-form';
import { AutodeclaracioncrsEditarForm } from './editar/autodeclaracioncrs-editar-form';
import { AutodeclaracioncrsEliminarForm } from './eliminar/autodeclaracioncrs-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: AutodeclaracioncrsAdministrar,
  },
  {
    path: 'administrar/:id',
    component: AutodeclaracioncrsAdministrar,
  },
  {
    path: 'agregar',
    component: AutodeclaracioncrsAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: AutodeclaracioncrsAgregarForm,
  },
  {
    path: 'editar/:id',
    component: AutodeclaracioncrsEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: AutodeclaracioncrsEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutodeclaracioncrsRoutingModule {}
