/* PSG  Aportacioninmueble Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AportacioninmuebleAdministrar } from './administrar/aportacioninmueble-administrar';
import { AportacioninmuebleAgregarForm } from './agregar/aportacioninmueble-agregar-form';
import { AportacioninmuebleEditarForm } from './editar/aportacioninmueble-editar-form';
import { AportacioninmuebleEliminarForm } from './eliminar/aportacioninmueble-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: AportacioninmuebleAdministrar,
  },
  {
    path: 'administrar/:id',
    component: AportacioninmuebleAdministrar,
  },
  {
    path: 'agregar',
    component: AportacioninmuebleAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: AportacioninmuebleAgregarForm,
  },
  {
    path: 'editar/:id',
    component: AportacioninmuebleEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: AportacioninmuebleEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AportacioninmuebleRoutingModule {}
