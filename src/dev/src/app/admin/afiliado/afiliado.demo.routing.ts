import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AfiliadoDemo } from './afiliado.demo';

import { AfiliadoAgregarDemo } from './agregar/afiliado-agregar';
import { AfiliadoAgregarFormDemo } from './agregar/afiliado-agregar-form';
import { AfiliadoEditarFormDemo } from './editar/afiliado-editar-form';
import { AfiliadoEliminarFormDemo } from './eliminar/afiliado-eliminar-form';
import { AfiliadoAdministrarDemo } from './administrar/afiliado-administrar';
import { AfiliadoEditarDemo } from './editar/afiliado-editar';
import { AfiliadoEliminarDemo } from './eliminar/afiliado-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: AfiliadoDemo,
    children: [
      { path: '', redirectTo: 'administrar', pathMatch: 'full' },
      {
        path: 'administrar',
        component: AfiliadoDemo,
        children: [
          { path: '', redirectTo: 'administrar', pathMatch: 'full' },
          { path: 'administrar', component: AfiliadoAdministrarDemo },
        ],
      },
      {
        path: 'agregar',
        component: AfiliadoAgregarDemo,
        children: [
          { path: '', redirectTo: 'agregar', pathMatch: 'full' },
          { path: 'agregar', component: AfiliadoAgregarFormDemo },
        ],
      },
      {
        path: 'editar',
        component: AfiliadoEditarDemo,
        children: [
          { path: '', redirectTo: 'editar', pathMatch: 'full' },
          { path: 'editar', component: AfiliadoEditarFormDemo },
        ],
      },
      {
        path: 'eliminar',
        component: AfiliadoEliminarDemo,
        children: [
          { path: '', redirectTo: 'eliminar', pathMatch: 'full' },
          { path: 'eliminar', component: AfiliadoEliminarFormDemo },
        ],
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
