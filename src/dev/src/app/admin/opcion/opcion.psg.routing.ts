/* PSG  Opcion Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpcionDemo } from './opcion.psg';
import { OpcionAdministrarDemo } from './administrar/opcion-administrar';
import { OpcionAgregarDemo } from './agregar/opcion-agregar';
import { OpcionAgregarFormDemo } from './agregar/opcion-agregar-form';
import { OpcionEditarFormDemo } from './editar/opcion-editar-form';
import { OpcionEditarDemo } from './editar/opcion-editar';
import { OpcionEliminarFormDemo } from './eliminar/opcion-eliminar-form';
import { OpcionEliminarDemo } from './eliminar/opcion-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: OpcionDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: OpcionAdministrarDemo },
      {
        path: 'administrar',
        component: OpcionAdministrarDemo,
      },
      {
        path: 'agregar',
        component: OpcionAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: OpcionEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: OpcionEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
