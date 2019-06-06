/* PSG  Evaluacionriesgos Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluacionriesgosAdministrar } from './administrar/evaluacionriesgos-administrar';
import { EvaluacionriesgosAgregarForm } from './agregar/evaluacionriesgos-agregar-form';
import { EvaluacionriesgosEditarForm } from './editar/evaluacionriesgos-editar-form';
import { EvaluacionriesgosEliminarForm } from './eliminar/evaluacionriesgos-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: EvaluacionriesgosAdministrar,
  },
  {
    path: 'administrar/:id',
    component: EvaluacionriesgosAdministrar,
  },
  {
    path: 'agregar',
    component: EvaluacionriesgosAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: EvaluacionriesgosAgregarForm,
  },
  {
    path: 'editar/:id',
    component: EvaluacionriesgosEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: EvaluacionriesgosEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluacionriesgosRoutingModule {}
