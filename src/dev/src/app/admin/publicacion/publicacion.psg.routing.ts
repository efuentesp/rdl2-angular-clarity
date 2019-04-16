/* PSG  Publicacion Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicacionDemo } from './publicacion.psg';
import { PublicacionAdministrarDemo } from './administrar/publicacion-administrar';
import { PublicacionAgregarDemo } from './agregar/publicacion-agregar';
import { PublicacionAgregarFormDemo } from './agregar/publicacion-agregar-form';
import { PublicacionEditarFormDemo } from './editar/publicacion-editar-form';
import { PublicacionEditarDemo } from './editar/publicacion-editar';
import { PublicacionEliminarFormDemo } from './eliminar/publicacion-eliminar-form';
import { PublicacionEliminarDemo } from './eliminar/publicacion-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: PublicacionDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: PublicacionAdministrarDemo },
      {
        path: 'administrar',
        component: PublicacionAdministrarDemo,
      },
      {
        path: 'agregar',
        component: PublicacionAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: PublicacionEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: PublicacionEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
