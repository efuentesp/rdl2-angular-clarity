/* PSG  Evento Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventoDemo } from './evento.psg';
import { EventoAdministrarDemo } from './administrar/evento-administrar';
import { EventoAgregarDemo } from './agregar/evento-agregar';
import { EventoAgregarFormDemo } from './agregar/evento-agregar-form';
import { EventoEditarFormDemo } from './editar/evento-editar-form';
import { EventoEditarDemo } from './editar/evento-editar';
import { EventoEliminarFormDemo } from './eliminar/evento-eliminar-form';
import { EventoEliminarDemo } from './eliminar/evento-eliminar';

import { RegistroDetailsFormDemo } from './registro-details/administrar/registro-administrar';
import { RegistroDetailsAgregarFormDemo } from './registro-details/agregar/registro-agregar-form';
import { RegistroDetailsEditarFormDemo } from './registro-details/editar/registro-editar-form';
import { RegistroDetailsEliminarFormDemo } from './registro-details/eliminar/registro-eliminar-form';

const ROUTES: Routes = [
  {
    path: '',
    component: EventoDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: EventoAdministrarDemo },
      {
        path: 'administrar',
        component: EventoAdministrarDemo,
      },
      {
        path: 'agregar',
        component: EventoAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: EventoEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: EventoEliminarFormDemo,
      },
      {
        path: 'registro-details/administrar/:id',
        component: RegistroDetailsFormDemo,
      },
      {
        path: 'registro-details/agregar/:id',
        component: RegistroDetailsAgregarFormDemo,
      },
      {
        path: 'registro-details/editar/:id',
        component: RegistroDetailsEditarFormDemo,
      },
      {
        path: 'registro-details/eliminar/:id',
        component: RegistroDetailsEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
