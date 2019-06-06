/* PSG  Comitetecnico Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComitetecnicoAdministrar } from './administrar/comitetecnico-administrar';
import { ComitetecnicoAgregarForm } from './agregar/comitetecnico-agregar-form';
import { ComitetecnicoEditarForm } from './editar/comitetecnico-editar-form';
import { ComitetecnicoEliminarForm } from './eliminar/comitetecnico-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: ComitetecnicoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: ComitetecnicoAdministrar,
  },
  {
    path: 'agregar',
    component: ComitetecnicoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: ComitetecnicoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: ComitetecnicoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: ComitetecnicoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComitetecnicoRoutingModule {}
