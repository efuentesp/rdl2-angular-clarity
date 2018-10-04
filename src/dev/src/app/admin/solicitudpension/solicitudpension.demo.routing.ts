import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SolicitudpensionDemo } from './solicitudpension.demo';

import { SolicitudpensionAgregarDemo } from './agregar/solicitudpension-agregar';
import { SolicitudpensionAgregarFormDemo } from './agregar/solicitudpension-agregar-form';
import { SolicitudpensionEditarFormDemo } from './editar/solicitudpension-editar-form';
import { SolicitudpensionEliminarFormDemo } from './eliminar/solicitudpension-eliminar-form';
import { SolicitudpensionAdministrarDemo } from './administrar/solicitudpension-administrar';
import { SolicitudpensionEditarDemo } from './editar/solicitudpension-editar';
import { SolicitudpensionEliminarDemo } from './eliminar/solicitudpension-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: SolicitudpensionDemo,
    children: [
      { path: '', redirectTo: 'administrar', pathMatch: 'full' },
      {
        path: 'administrar',
        component: SolicitudpensionDemo,
        children: [
          { path: '', redirectTo: 'administrar', pathMatch: 'full' },
          { path: 'administrar', component: SolicitudpensionAdministrarDemo },
        ],
      },
      {
        path: 'agregar',
        component: SolicitudpensionAgregarDemo,
        children: [
          { path: '', redirectTo: 'agregar', pathMatch: 'full' },
          { path: 'agregar', component: SolicitudpensionAgregarFormDemo },
        ],
      },
      {
        path: 'editar',
        component: SolicitudpensionEditarDemo,
        children: [
          { path: '', redirectTo: 'editar', pathMatch: 'full' },
          { path: 'editar', component: SolicitudpensionEditarFormDemo },
        ],
      },
      {
        path: 'eliminar',
        component: SolicitudpensionEliminarDemo,
        children: [
          { path: '', redirectTo: 'eliminar', pathMatch: 'full' },
          { path: 'eliminar', component: SolicitudpensionEliminarFormDemo },
        ],
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
