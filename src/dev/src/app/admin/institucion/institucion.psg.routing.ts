/* PSG  Institucion Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstitucionDemo } from './institucion.psg';
import { InstitucionAdministrarDemo } from './administrar/institucion-administrar';
import { InstitucionAgregarDemo } from './agregar/institucion-agregar';
import { InstitucionAgregarFormDemo } from './agregar/institucion-agregar-form';
import { InstitucionEditarFormDemo } from './editar/institucion-editar-form';
import { InstitucionEditarDemo } from './editar/institucion-editar';
import { InstitucionEliminarFormDemo } from './eliminar/institucion-eliminar-form';
import { InstitucionEliminarDemo } from './eliminar/institucion-eliminar';

// import { EventoDetailsFormDemo } from './evento-details/administrar/evento-administrar';
// import { EventoDetailsAgregarFormDemo } from './evento-details/agregar/evento-agregar-form';
// import { EventoDetailsEditarFormDemo } from './evento-details/editar/evento-editar-form';
// import { EventoDetailsEliminarFormDemo } from './evento-details/eliminar/evento-eliminar-form';

const ROUTES: Routes = [
  {
    path: '',
    component: InstitucionDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: InstitucionAdministrarDemo },
      {
        path: 'administrar',
        component: InstitucionAdministrarDemo,
      },
      {
        path: 'agregar',
        component: InstitucionAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: InstitucionEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: InstitucionEliminarFormDemo,
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
