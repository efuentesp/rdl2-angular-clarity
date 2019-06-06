/* PSG  Compraventavalores Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraventavaloresAdministrar } from './administrar/compraventavalores-administrar';
import { CompraventavaloresAgregarForm } from './agregar/compraventavalores-agregar-form';
import { CompraventavaloresEditarForm } from './editar/compraventavalores-editar-form';
import { CompraventavaloresEliminarForm } from './eliminar/compraventavalores-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: CompraventavaloresAdministrar,
  },
  {
    path: 'administrar/:id',
    component: CompraventavaloresAdministrar,
  },
  {
    path: 'agregar',
    component: CompraventavaloresAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: CompraventavaloresAgregarForm,
  },
  {
    path: 'editar/:id',
    component: CompraventavaloresEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: CompraventavaloresEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraventavaloresRoutingModule {}
