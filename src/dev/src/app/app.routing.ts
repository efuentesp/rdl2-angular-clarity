import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards';
import { LoginComponent } from './login/login.demo';

export const APP_ROUTES: Routes = [
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '', component: LoginComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
