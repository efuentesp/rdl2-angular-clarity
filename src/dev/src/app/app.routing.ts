import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards';
import { LoginComponent } from './login/login.demo';
import { RegisterComponent } from './register';
import { AdminComponent } from './admin/admin.component';

export const APP_ROUTES: Routes = [
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard],
  // },

  //{ path: 'alert', component:AlertsDemo, canActivate: [AuthGuard] },
  //{ path: '', component: LoginComponent},

  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
  },

  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', component: LoginComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
