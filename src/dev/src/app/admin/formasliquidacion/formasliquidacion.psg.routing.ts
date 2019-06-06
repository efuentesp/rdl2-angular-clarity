/* PSG  Formasliquidacion Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormasliquidacionAdministrar } from './administrar/formasliquidacion-administrar';
import { FormasliquidacionAgregarForm } from './agregar/formasliquidacion-agregar-form';
import { FormasliquidacionEditarForm } from './editar/formasliquidacion-editar-form';
import { FormasliquidacionEliminarForm } from './eliminar/formasliquidacion-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: FormasliquidacionAdministrar,
  },
  {
    path: 'administrar/:id',
    component: FormasliquidacionAdministrar,
  },
  {
    path: 'agregar',
    component: FormasliquidacionAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: FormasliquidacionAgregarForm,
  },
  {
    path: 'editar/:id',
    component: FormasliquidacionEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: FormasliquidacionEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormasliquidacionRoutingModule {}
