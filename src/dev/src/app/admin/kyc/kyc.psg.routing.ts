/* PSG  Kyc Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KycAdministrar } from './administrar/kyc-administrar';
import { KycAgregarForm } from './agregar/kyc-agregar-form';
import { KycEditarForm } from './editar/kyc-editar-form';
import { KycEliminarForm } from './eliminar/kyc-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: KycAdministrar,
  },
  {
    path: 'administrar/:id',
    component: KycAdministrar,
  },
  {
    path: 'agregar',
    component: KycAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: KycAgregarForm,
  },
  {
    path: 'editar/:id',
    component: KycEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: KycEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KycRoutingModule {}
