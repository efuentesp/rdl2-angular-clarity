import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TipopensionDemo } from './tipopension.demo';

import { TipopensionAgregarDemo } from './agregar/tipopension-agregar';
import { TipopensionAgregarFormDemo } from './agregar/tipopension-agregar-form';
import { TipopensionEditarFormDemo } from './editar/tipopension-editar-form';
import { TipopensionEliminarFormDemo } from './eliminar/tipopension-eliminar-form';
import { TipopensionAdministrarDemo } from './administrar/tipopension-administrar';
import { TipopensionEditarDemo } from './editar/tipopension-editar';
import { TipopensionEliminarDemo } from './eliminar/tipopension-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: TipopensionDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: TipopensionAdministrarDemo },
      {
        path: 'administrar',
        component: TipopensionAdministrarDemo,
      },
      {
        path: 'agregar',
        component: TipopensionAgregarFormDemo,
      },
      {
        path: 'editar',
        component: TipopensionEditarFormDemo,
      },
      {
        path: 'eliminar',
        component: TipopensionEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
