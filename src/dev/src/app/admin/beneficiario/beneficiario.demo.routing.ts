import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeneficiarioDemo } from './beneficiario.demo';

import { BeneficiarioAgregarDemo } from './agregar/beneficiario-agregar';
import { BeneficiarioAgregarFormDemo } from './agregar/beneficiario-agregar-form';
import { BeneficiarioEditarFormDemo } from './editar/beneficiario-editar-form';
import { BeneficiarioEliminarFormDemo } from './eliminar/beneficiario-eliminar-form';
import { BeneficiarioAdministrarDemo } from './administrar/beneficiario-administrar';
import { BeneficiarioEditarDemo } from './editar/beneficiario-editar';
import { BeneficiarioEliminarDemo } from './eliminar/beneficiario-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: BeneficiarioDemo,
    children: [
      { path: '', redirectTo: 'administrar' },
      {
        path: 'administrar',
        component: BeneficiarioAdministrarDemo,
      },
      {
        path: 'agregar',
        component: BeneficiarioAgregarFormDemo,
      },
      {
        path: 'editar',
        component: BeneficiarioEditarFormDemo,
      },
      {
        path: 'eliminar',
        component: BeneficiarioEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
