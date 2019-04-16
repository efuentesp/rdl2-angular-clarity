/* PSG  Profesor Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfesorDemo } from './profesor.psg';
import { ProfesorAdministrarDemo } from './administrar/profesor-administrar';
import { ProfesorAgregarDemo } from './agregar/profesor-agregar';
import { ProfesorAgregarFormDemo } from './agregar/profesor-agregar-form';
import { ProfesorEditarFormDemo } from './editar/profesor-editar-form';
import { ProfesorEditarDemo } from './editar/profesor-editar';
import { ProfesorEliminarFormDemo } from './eliminar/profesor-eliminar-form';
import { ProfesorEliminarDemo } from './eliminar/profesor-eliminar';

// import { EventoDetailsFormDemo } from './evento-details/administrar/evento-administrar';
// import { EventoDetailsAgregarFormDemo } from './evento-details/agregar/evento-agregar-form';
// import { EventoDetailsEditarFormDemo } from './evento-details/editar/evento-editar-form';
// import { EventoDetailsEliminarFormDemo } from './evento-details/eliminar/evento-eliminar-form';

const ROUTES: Routes = [
  {
    path: '',
    component: ProfesorDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: ProfesorAdministrarDemo },
      {
        path: 'administrar',
        component: ProfesorAdministrarDemo,
      },
      {
        path: 'agregar',
        component: ProfesorAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: ProfesorEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: ProfesorEliminarFormDemo,
      },
      // {
      // 	path: 'evento-details/administrar/:id',
      // 	component: EventoDetailsFormDemo,
      // },
      // 	    {
      // 	    	path: 'evento-details/agregar/:id',
      // 	    	component: EventoDetailsAgregarFormDemo,
      // 	    },
      // {
      // 	path: 'evento-details/editar/:id',
      // 	component: EventoDetailsEditarFormDemo,
      // },
      //     {
      //     	path: 'evento-details/eliminar/:id',
      //     	component: EventoDetailsEliminarFormDemo,
      //     },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
