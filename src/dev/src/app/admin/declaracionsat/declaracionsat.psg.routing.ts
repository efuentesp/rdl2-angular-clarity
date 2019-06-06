/* PSG  Declaracionsat Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclaracionsatAdministrar } from './administrar/declaracionsat-administrar';
import { DeclaracionsatAgregarForm } from './agregar/declaracionsat-agregar-form';
import { DeclaracionsatEditarForm } from './editar/declaracionsat-editar-form';
import { DeclaracionsatEliminarForm } from './eliminar/declaracionsat-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: DeclaracionsatAdministrar,
  },
  {
    path: 'administrar/:id',
    component: DeclaracionsatAdministrar,
  },
  {
    path: 'agregar',
    component: DeclaracionsatAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: DeclaracionsatAgregarForm,
  },
  {
    path: 'editar/:id',
    component: DeclaracionsatEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: DeclaracionsatEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclaracionsatRoutingModule {}
