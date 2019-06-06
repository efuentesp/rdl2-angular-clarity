/* PSG  Honorarioadministracion Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HonorarioadministracionAdministrar } from './administrar/honorarioadministracion-administrar';
import { HonorarioadministracionAgregarForm } from './agregar/honorarioadministracion-agregar-form';
import { HonorarioadministracionEditarForm } from './editar/honorarioadministracion-editar-form';
import { HonorarioadministracionEliminarForm } from './eliminar/honorarioadministracion-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: HonorarioadministracionAdministrar,
  },
  {
    path: 'administrar/:id',
    component: HonorarioadministracionAdministrar,
  },
  {
    path: 'agregar',
    component: HonorarioadministracionAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: HonorarioadministracionAgregarForm,
  },
  {
    path: 'editar/:id',
    component: HonorarioadministracionEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: HonorarioadministracionEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HonorarioadministracionRoutingModule {}
