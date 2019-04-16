/* PSG  Recurso Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecursoDemo } from './recurso.psg';
import { RecursoAdministrarDemo } from './administrar/recurso-administrar';
import { RecursoAgregarDemo } from './agregar/recurso-agregar';
import { RecursoAgregarFormDemo } from './agregar/recurso-agregar-form';
import { RecursoEditarFormDemo } from './editar/recurso-editar-form';
import { RecursoEditarDemo } from './editar/recurso-editar';
import { RecursoEliminarFormDemo } from './eliminar/recurso-eliminar-form';
import { RecursoEliminarDemo } from './eliminar/recurso-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: RecursoDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: RecursoAdministrarDemo },
      {
        path: 'administrar',
        component: RecursoAdministrarDemo,
      },
      {
        path: 'agregar',
        component: RecursoAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: RecursoEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: RecursoEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
