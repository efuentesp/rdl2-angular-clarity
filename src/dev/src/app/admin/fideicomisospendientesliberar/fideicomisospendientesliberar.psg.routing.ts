/* PSG  Fideicomisospendientesliberar Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FideicomisospendientesliberarAdministrar } from './administrar/fideicomisospendientesliberar-administrar';
import { FideicomisospendientesliberarAgregarForm } from './agregar/fideicomisospendientesliberar-agregar-form';
import { FideicomisospendientesliberarEditarForm } from './editar/fideicomisospendientesliberar-editar-form';
import { FideicomisospendientesliberarEliminarForm } from './eliminar/fideicomisospendientesliberar-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: FideicomisospendientesliberarAdministrar,
  },
  {
    path: 'administrar/:id',
    component: FideicomisospendientesliberarAdministrar,
  },
  {
    path: 'agregar',
    component: FideicomisospendientesliberarAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: FideicomisospendientesliberarAgregarForm,
  },
  {
    path: 'editar/:id',
    component: FideicomisospendientesliberarEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: FideicomisospendientesliberarEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FideicomisospendientesliberarRoutingModule {}
