/* PSG  Aplicacionpagoscontrolados Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionpagoscontroladosAdministrar } from './administrar/aplicacionpagoscontrolados-administrar';
import { AplicacionpagoscontroladosAgregarForm } from './agregar/aplicacionpagoscontrolados-agregar-form';
import { AplicacionpagoscontroladosEditarForm } from './editar/aplicacionpagoscontrolados-editar-form';
import { AplicacionpagoscontroladosEliminarForm } from './eliminar/aplicacionpagoscontrolados-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: AplicacionpagoscontroladosAdministrar,
  },
  {
    path: 'administrar/:id',
    component: AplicacionpagoscontroladosAdministrar,
  },
  {
    path: 'agregar',
    component: AplicacionpagoscontroladosAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: AplicacionpagoscontroladosAgregarForm,
  },
  {
    path: 'editar/:id',
    component: AplicacionpagoscontroladosEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: AplicacionpagoscontroladosEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicacionpagoscontroladosRoutingModule {}
