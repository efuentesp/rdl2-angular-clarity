import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeneficiarioDemo } from './beneficiario.demo';

import { BeneficiarioAgregarDemo } from './agregar/beneficiario-agregar';
import { BeneficiarioAgregarFormDemo } from './agregar/beneficiario-agregar-form';
import { BeneficiarioEditarFormDemo } from './editar/beneficiario-editar-form';
// import { BeneficiarioEliminarFormDemo } from './eliminar/beneficiario-eliminar-form';
import { BeneficiarioAdministrarDemo } from './administrar/beneficiario-administrar';
import { BeneficiarioEditarDemo } from './editar/beneficiario-editar';
// import { BeneficiarioEliminarDemo } from './eliminar/beneficiario-eliminar';

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
      {
        path: 'editar',
        component: BeneficiarioEditarDemo,
        children: [
          { path: '', redirectTo: 'editar', pathMatch: 'full' },
          { path: 'editar', component: BeneficiarioEditarFormDemo },
        ],
      }
      // {
      //   path: 'eliminar',
      //   component: BeneficiarioEliminarDemo,
      //   children: [
      //     { path: '', redirectTo: 'eliminar', pathMatch: 'full' },
      //     { path: 'eliminar', component: BeneficiarioEliminarFormDemo },
      //   ],
      // },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
