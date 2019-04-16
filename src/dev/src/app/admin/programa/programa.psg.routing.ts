/* PSG  Programa Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramaDemo } from './programa.psg';
import { ProgramaAdministrarDemo } from './administrar/programa-administrar';
import { ProgramaAgregarDemo } from './agregar/programa-agregar';
import { ProgramaAgregarFormDemo } from './agregar/programa-agregar-form';
import { ProgramaEditarFormDemo } from './editar/programa-editar-form';
import { ProgramaEditarDemo } from './editar/programa-editar';
import { ProgramaEliminarFormDemo } from './eliminar/programa-eliminar-form';
import { ProgramaEliminarDemo } from './eliminar/programa-eliminar';

import { EstudianteDetailsFormDemo } from './estudiante-details/administrar/estudiante-administrar';
import { EstudianteDetailsAgregarFormDemo } from './estudiante-details/agregar/estudiante-agregar-form';
import { EstudianteDetailsEditarFormDemo } from './estudiante-details/editar/estudiante-editar-form';
import { EstudianteDetailsEliminarFormDemo } from './estudiante-details/eliminar/estudiante-eliminar-form';
import { PublicacionDetailsFormDemo } from './publicacion-details/administrar/publicacion-administrar';
import { PublicacionDetailsAgregarFormDemo } from './publicacion-details/agregar/publicacion-agregar-form';
import { PublicacionDetailsEditarFormDemo } from './publicacion-details/editar/publicacion-editar-form';
import { PublicacionDetailsEliminarFormDemo } from './publicacion-details/eliminar/publicacion-eliminar-form';

const ROUTES: Routes = [
  {
    path: '',
    component: ProgramaDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: ProgramaAdministrarDemo },
      {
        path: 'administrar',
        component: ProgramaAdministrarDemo,
      },
      {
        path: 'agregar',
        component: ProgramaAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: ProgramaEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: ProgramaEliminarFormDemo,
      },
      {
        path: 'estudiante-details/administrar/:id',
        component: EstudianteDetailsFormDemo,
      },
      {
        path: 'estudiante-details/agregar/:id',
        component: EstudianteDetailsAgregarFormDemo,
      },
      {
        path: 'estudiante-details/editar/:id',
        component: EstudianteDetailsEditarFormDemo,
      },
      {
        path: 'estudiante-details/eliminar/:id',
        component: EstudianteDetailsEliminarFormDemo,
      },
      {
        path: 'publicacion-details/administrar/:id',
        component: PublicacionDetailsFormDemo,
      },
      {
        path: 'publicacion-details/agregar/:id',
        component: PublicacionDetailsAgregarFormDemo,
      },
      {
        path: 'publicacion-details/editar/:id',
        component: PublicacionDetailsEditarFormDemo,
      },
      {
        path: 'publicacion-details/eliminar/:id',
        component: PublicacionDetailsEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
