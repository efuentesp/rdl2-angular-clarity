/* PSG  Certificacion Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertificacionDemo } from './certificacion.psg';
import { CertificacionAdministrarDemo } from './administrar/certificacion-administrar';
import { CertificacionAgregarDemo } from './agregar/certificacion-agregar';
import { CertificacionAgregarFormDemo } from './agregar/certificacion-agregar-form';
import { CertificacionEditarFormDemo } from './editar/certificacion-editar-form';
import { CertificacionEditarDemo } from './editar/certificacion-editar';
import { CertificacionEliminarFormDemo } from './eliminar/certificacion-eliminar-form';
import { CertificacionEliminarDemo } from './eliminar/certificacion-eliminar';

const ROUTES: Routes = [
  {
    path: '',
    component: CertificacionDemo,
    children: [
      { path: '', redirectTo: 'administrar', component: CertificacionAdministrarDemo },
      {
        path: 'administrar',
        component: CertificacionAdministrarDemo,
      },
      {
        path: 'agregar',
        component: CertificacionAgregarFormDemo,
      },
      {
        path: 'editar/:id',
        component: CertificacionEditarFormDemo,
      },
      {
        path: 'eliminar/:id',
        component: CertificacionEliminarFormDemo,
      },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
