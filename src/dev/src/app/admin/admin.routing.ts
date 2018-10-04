import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../_guards';
import { HomeComponent } from './home.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'Afiliado',
    loadChildren: 'src/app/afiliado/afiliado.demo.module#AfiliadoDemoModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'Beneficiario',
    loadChildren: 'src/app/beneficiario/beneficiario.demo.module#BeneficiarioDemoModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'Solicitudpension',
    loadChildren: 'src/app/solicitudpension/solicitudpension.demo.module#SolicitudpensionDemoModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'Tipopension',
    loadChildren: 'src/app/tipopension/tipopension.demo.module#TipopensionDemoModule',
    canActivate: [AuthGuard],
  },
];

export const ADMIN_ROUTING: ModuleWithProviders = RouterModule.forRoot(ADMIN_ROUTES);
