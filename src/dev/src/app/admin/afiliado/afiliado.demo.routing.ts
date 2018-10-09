import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AfiliadoDemo } from './afiliado.demo';

import { AfiliadoAgregarDemo } from './agregar/afiliado-agregar';
import { AfiliadoAgregarFormDemo } from './agregar/afiliado-agregar-form';
import { AfiliadoEditarFormDemo } from './editar/afiliado-editar-form';
import { AfiliadoEliminarFormDemo } from './eliminar/afiliado-eliminar-form';

import { AfiliadoEditarDemo } from './editar/afiliado-editar';
import { AfiliadoEliminarDemo } from './eliminar/afiliado-eliminar';
import { AfiliadoAdministrarDemo } from './administrar/afiliado-administrar';
import { BeneficiarioDetailsFormDemo } from './beneficiario-details/beneficiario-details';

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
      {
        path: 'beneficiario-details/:id',
        component: BeneficiarioDetailsFormDemo,
      },
      {
        path: 'beneficiario-details/:id',
        component: BeneficiarioDetailsFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
