/* PSG  Examen Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamenDemo } from './examen.psg';
import { ExamenAdministrarDemo } from './administrar/examen-administrar';
import { ExamenAgregarDemo } from './agregar/examen-agregar';
import { ExamenAgregarFormDemo } from './agregar/examen-agregar-form';
import { ExamenEditarFormDemo } from './editar/examen-editar-form';
import { ExamenEditarDemo } from './editar/examen-editar';
import { ExamenEliminarFormDemo } from './eliminar/examen-eliminar-form';
import { ExamenEliminarDemo } from './eliminar/examen-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: ExamenDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: ExamenAdministrarDemo },
      {
        path: 'administrar',
        component: ExamenAdministrarDemo,
      },
      {
        path: 'agregar',
        component: ExamenAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: ExamenEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: ExamenEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
