/* PSG  Pregunta Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreguntaDemo } from './pregunta.psg';
import { PreguntaAdministrarDemo } from './administrar/pregunta-administrar';
import { PreguntaAgregarDemo } from './agregar/pregunta-agregar';
import { PreguntaAgregarFormDemo } from './agregar/pregunta-agregar-form';
import { PreguntaEditarFormDemo } from './editar/pregunta-editar-form';
import { PreguntaEditarDemo } from './editar/pregunta-editar';
import { PreguntaEliminarFormDemo } from './eliminar/pregunta-eliminar-form';
import { PreguntaEliminarDemo } from './eliminar/pregunta-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: PreguntaDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: PreguntaAdministrarDemo },
      {
        path: 'administrar',
        component: PreguntaAdministrarDemo,
      },
      {
        path: 'agregar',
        component: PreguntaAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: PreguntaEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: PreguntaEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
