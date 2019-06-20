/** PSG Admin Routing **/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

/* Security */
import { AdministracionDemoModule } from './administracion/administracion.psg.module';
import { UserDemoModule } from './user/user.psg.module';
import { RolDemoModule } from './rol/rol.psg.module';



const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'administracion',
        loadChildren: () => AdministracionDemoModule
      },
      {
        path: 'user',
        loadChildren: () => UserDemoModule
      },
      {
        path: 'rol',
        loadChildren: () => RolDemoModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

