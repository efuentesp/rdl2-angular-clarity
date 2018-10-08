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
      { path: '', redirectTo: 'administrar', component: AfiliadoAdministrarDemo },
      {
        path: 'administrar',
        component: AfiliadoAdministrarDemo,
      },
      {
        path: 'agregar',
        component: AfiliadoAgregarFormDemo,
      },
      {
        path: 'editar',
        component: AfiliadoEditarFormDemo,
      },
      {
        path: 'eliminar',
        component: AfiliadoEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
