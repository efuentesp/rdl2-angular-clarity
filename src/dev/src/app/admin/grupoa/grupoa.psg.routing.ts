/* PSG  Grupoa Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrupoaDemo } from './grupoa.psg';
import { GrupoaAdministrarDemo } from './administrar/grupoa-administrar';
import { GrupoaAgregarDemo } from './agregar/grupoa-agregar';
import { GrupoaAgregarFormDemo } from './agregar/grupoa-agregar-form';
import { GrupoaEditarFormDemo } from './editar/grupoa-editar-form';
import { GrupoaEditarDemo } from './editar/grupoa-editar';
import { GrupoaEliminarFormDemo } from './eliminar/grupoa-eliminar-form';
import { GrupoaEliminarDemo } from './eliminar/grupoa-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: GrupoaDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: GrupoaAdministrarDemo },
      {
        path: 'administrar',
        component: GrupoaAdministrarDemo,
      },
      {
        path: 'agregar',
        component: GrupoaAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: GrupoaEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: GrupoaEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
