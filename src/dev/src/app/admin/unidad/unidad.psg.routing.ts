/* PSG  Unidad Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnidadDemo } from './unidad.psg';
import { UnidadAdministrarDemo } from './administrar/unidad-administrar';
import { UnidadAgregarDemo } from './agregar/unidad-agregar';
import { UnidadAgregarFormDemo } from './agregar/unidad-agregar-form';
import { UnidadEditarFormDemo } from './editar/unidad-editar-form';
import { UnidadEditarDemo } from './editar/unidad-editar';
import { UnidadEliminarFormDemo } from './eliminar/unidad-eliminar-form';
import { UnidadEliminarDemo } from './eliminar/unidad-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: UnidadDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: UnidadAdministrarDemo },
      {
        path: 'administrar',
        component: UnidadAdministrarDemo,
      },
      {
        path: 'agregar',
        component: UnidadAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: UnidadEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: UnidadEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
