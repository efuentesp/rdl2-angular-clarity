import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Afiliado', loadChildren: 'src/app/afiliado/afiliado.demo.module#AfiliadoDemoModule' },
  { path: 'Beneficiario', loadChildren: 'src/app/beneficiario/beneficiario.demo.module#BeneficiarioDemoModule' },
  {
    path: 'Solicitudpension',
    loadChildren: 'src/app/solicitudpension/solicitudpension.demo.module#SolicitudpensionDemoModule',
  },
  { path: 'Tipopension', loadChildren: 'src/app/tipopension/tipopension.demo.module#TipopensionDemoModule' },
  { path: 'login', loadChildren: 'src/app/login/login.demo.module#LoginDemoModule' },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
