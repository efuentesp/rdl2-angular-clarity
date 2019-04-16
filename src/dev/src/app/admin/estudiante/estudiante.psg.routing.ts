/* PSG  Estudiante Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstudianteDemo } from './estudiante.psg';
import { EstudianteAdministrarDemo } from './administrar/estudiante-administrar';
import { EstudianteAgregarDemo } from './agregar/estudiante-agregar';
import { EstudianteAgregarFormDemo } from './agregar/estudiante-agregar-form';
import { EstudianteEditarFormDemo } from './editar/estudiante-editar-form';
import { EstudianteEditarDemo } from './editar/estudiante-editar';
import { EstudianteEliminarFormDemo } from './eliminar/estudiante-eliminar-form';
import { EstudianteEliminarDemo } from './eliminar/estudiante-eliminar';

import { RegistroDetailsFormDemo } from './registro-details/administrar/registro-administrar';
import { RegistroDetailsAgregarFormDemo } from './registro-details/agregar/registro-agregar-form';
import { RegistroDetailsEditarFormDemo } from './registro-details/editar/registro-editar-form';
import { RegistroDetailsEliminarFormDemo } from './registro-details/eliminar/registro-eliminar-form';

const ROUTES: Routes = [
  {
    path: '',
    component: EstudianteDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: EstudianteAdministrarDemo },
      {
        path: 'administrar',
        component: EstudianteAdministrarDemo,
      },
      {
        path: 'agregar',
        component: EstudianteAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: EstudianteEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: EstudianteEliminarFormDemo,
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
