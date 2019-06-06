/* PSG  Carteraadeudo Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarteraadeudoAdministrar } from './administrar/carteraadeudo-administrar';
import { CarteraadeudoAgregarForm } from './agregar/carteraadeudo-agregar-form';
import { CarteraadeudoEditarForm } from './editar/carteraadeudo-editar-form';
import { CarteraadeudoEliminarForm } from './eliminar/carteraadeudo-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: CarteraadeudoAdministrar,
  },
  {
    path: 'administrar/:id',
    component: CarteraadeudoAdministrar,
  },
  {
    path: 'agregar',
    component: CarteraadeudoAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: CarteraadeudoAgregarForm,
  },
  {
    path: 'editar/:id',
    component: CarteraadeudoEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: CarteraadeudoEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteraadeudoRoutingModule {}
