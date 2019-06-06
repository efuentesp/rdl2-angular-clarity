/* PSG  Documentosfideicomiso Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosfideicomisoAdministrar } from './administrar/documentosfideicomiso-administrar';
import { DocumentosfideicomisoAgregarForm } from './agregar/documentosfideicomiso-agregar-form';
import { DocumentosfideicomisoEditarForm } from './editar/documentosfideicomiso-editar-form';
import { DocumentosfideicomisoEliminarForm } from './eliminar/documentosfideicomiso-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: DocumentosfideicomisoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: DocumentosfideicomisoAdministrar,
  },
  {
    path: 'agregar',
    component: DocumentosfideicomisoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: DocumentosfideicomisoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: DocumentosfideicomisoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: DocumentosfideicomisoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosfideicomisoRoutingModule {}
