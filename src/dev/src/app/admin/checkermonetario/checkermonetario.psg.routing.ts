/* PSG  Checkermonetario Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckermonetarioAdministrar } from './administrar/checkermonetario-administrar';
import { CheckermonetarioAgregarForm } from './agregar/checkermonetario-agregar-form';
import { CheckermonetarioEditarForm } from './editar/checkermonetario-editar-form';
import { CheckermonetarioEliminarForm } from './eliminar/checkermonetario-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: CheckermonetarioAdministrar,
  },
  {
    path: 'administrar/:id',
    component: CheckermonetarioAdministrar,
  },
  {
    path: 'agregar',
    component: CheckermonetarioAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: CheckermonetarioAgregarForm,
  },
  {
    path: 'editar/:id',
    component: CheckermonetarioEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: CheckermonetarioEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckermonetarioRoutingModule {}
