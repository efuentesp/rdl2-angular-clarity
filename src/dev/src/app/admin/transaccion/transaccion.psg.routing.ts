/* PSG  Transaccion Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionAdministrar } from './administrar/transaccion-administrar';
import { TransaccionAgregarForm } from './agregar/transaccion-agregar-form';
import { TransaccionEditarForm } from './editar/transaccion-editar-form';
import { TransaccionEliminarForm } from './eliminar/transaccion-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: TransaccionAdministrar,
  },
  {
    path: 'administrar/:id',
    component: TransaccionAdministrar,
  },
  {
    path: 'agregar',
    component: TransaccionAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: TransaccionAgregarForm,
  },
  {
    path: 'editar/:id',
    component: TransaccionEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: TransaccionEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransaccionRoutingModule {}
