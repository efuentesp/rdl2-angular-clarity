/* PSG  Ventadirecto Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentadirectoAdministrar } from './administrar/ventadirecto-administrar';
import { VentadirectoAgregarForm } from './agregar/ventadirecto-agregar-form';
import { VentadirectoEditarForm } from './editar/ventadirecto-editar-form';
import { VentadirectoEliminarForm } from './eliminar/ventadirecto-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: VentadirectoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: VentadirectoAdministrar,
  },
  {
    path: 'agregar',
    component: VentadirectoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: VentadirectoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: VentadirectoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: VentadirectoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentadirectoRoutingModule {}
