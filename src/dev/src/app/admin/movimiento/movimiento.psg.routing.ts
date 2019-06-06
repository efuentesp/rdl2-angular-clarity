/* PSG  Movimiento Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimientoAdministrar } from './administrar/movimiento-administrar';
import { MovimientoAgregarForm } from './agregar/movimiento-agregar-form';
import { MovimientoEditarForm } from './editar/movimiento-editar-form';
import { MovimientoEliminarForm } from './eliminar/movimiento-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: MovimientoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: MovimientoAdministrar,
  },
  {
    path: 'agregar',
    component: MovimientoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: MovimientoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: MovimientoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: MovimientoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoRoutingModule {}
