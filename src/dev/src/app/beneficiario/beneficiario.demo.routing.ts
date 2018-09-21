import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeneficiarioDemo } from './beneficiario.demo';

import { BeneficiarioAgregarDemo } from './agregar/beneficiario-agregar';
import { BeneficiarioAgregarFormDemo } from './agregar/beneficiario-agregar-form';

import { BeneficiarioAdministrarDemo } from './administrar/beneficiario-administrar';

const ROUTES: Routes = [
  {
    path: '',
    component: BeneficiarioDemo,
    children: [
      { path: '', redirectTo: 'administrar', pathMatch: 'full' },
      {
        path: 'administrar',
        component: BeneficiarioDemo,
        children: [
          { path: '', redirectTo: 'administrar', pathMatch: 'full' },
          { path: 'administrar', component: BeneficiarioAdministrarDemo },
        ],
      },
      {
        path: 'agregar',
        component: BeneficiarioAgregarDemo,
        children: [
          { path: '', redirectTo: 'agregar', pathMatch: 'full' },
          { path: 'agregar', component: BeneficiarioAgregarFormDemo },
        ],
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
