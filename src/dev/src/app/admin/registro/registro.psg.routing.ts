/* PSG  Registro Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroDemo } from './registro.psg';
import { RegistroAdministrarDemo } from './administrar/registro-administrar';
import { RegistroAgregarDemo } from './agregar/registro-agregar';
import { RegistroAgregarFormDemo } from './agregar/registro-agregar-form';
import { RegistroEditarFormDemo } from './editar/registro-editar-form';
import { RegistroEditarDemo } from './editar/registro-editar';
import { RegistroEliminarFormDemo } from './eliminar/registro-eliminar-form';
import { RegistroEliminarDemo } from './eliminar/registro-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: RegistroDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: RegistroAdministrarDemo },
      {
        path: 'administrar',
        component: RegistroAdministrarDemo,
      },
      {
        path: 'agregar',
        component: RegistroAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: RegistroEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: RegistroEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
