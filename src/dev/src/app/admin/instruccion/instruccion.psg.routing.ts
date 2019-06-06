/* PSG  Instruccion Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstruccionAdministrar } from './administrar/instruccion-administrar';
import { InstruccionAgregarForm } from './agregar/instruccion-agregar-form';
import { InstruccionEditarForm } from './editar/instruccion-editar-form';
import { InstruccionEliminarForm } from './eliminar/instruccion-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: InstruccionAdministrar,
  },
  {
    path: 'administrar/:id',
    component: InstruccionAdministrar,
  },
  {
    path: 'agregar',
    component: InstruccionAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: InstruccionAgregarForm,
  },
  {
    path: 'editar/:id',
    component: InstruccionEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: InstruccionEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstruccionRoutingModule {}
