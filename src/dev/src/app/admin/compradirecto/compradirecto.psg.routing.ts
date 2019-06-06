/* PSG  Compradirecto Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompradirectoAdministrar } from './administrar/compradirecto-administrar';
import { CompradirectoAgregarForm } from './agregar/compradirecto-agregar-form';
import { CompradirectoEditarForm } from './editar/compradirecto-editar-form';
import { CompradirectoEliminarForm } from './eliminar/compradirecto-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: CompradirectoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: CompradirectoAdministrar,
  },
  {
    path: 'agregar',
    component: CompradirectoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: CompradirectoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: CompradirectoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: CompradirectoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompradirectoRoutingModule {}
