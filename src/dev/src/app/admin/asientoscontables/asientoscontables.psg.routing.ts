/* PSG  Asientoscontables Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsientoscontablesAdministrar } from './administrar/asientoscontables-administrar';
import { AsientoscontablesAgregarForm } from './agregar/asientoscontables-agregar-form';
import { AsientoscontablesEditarForm } from './editar/asientoscontables-editar-form';
import { AsientoscontablesEliminarForm } from './eliminar/asientoscontables-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: AsientoscontablesAdministrar,
  },
  {
    path: 'administrar/:id',
    component: AsientoscontablesAdministrar,
  },
  {
    path: 'agregar',
    component: AsientoscontablesAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: AsientoscontablesAgregarForm,
  },
  {
    path: 'editar/:id',
    component: AsientoscontablesEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: AsientoscontablesEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsientoscontablesRoutingModule {}
