/* PSG  Contratoinversion Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratoinversionAdministrar } from './administrar/contratoinversion-administrar';
import { ContratoinversionAgregarForm } from './agregar/contratoinversion-agregar-form';
import { ContratoinversionEditarForm } from './editar/contratoinversion-editar-form';
import { ContratoinversionEliminarForm } from './eliminar/contratoinversion-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: ContratoinversionAdministrar,
  },
  {
    path: 'administrar/:id',
    component: ContratoinversionAdministrar,
  },
  {
    path: 'agregar',
    component: ContratoinversionAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: ContratoinversionAgregarForm,
  },
  {
    path: 'editar/:id',
    component: ContratoinversionEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: ContratoinversionEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratoinversionRoutingModule {}
