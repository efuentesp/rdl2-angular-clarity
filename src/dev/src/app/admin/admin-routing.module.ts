import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthGuard } from '../_guards';

// import { UserCreateComponent } from './user/createUser/user-create.component';
import { AfiliadoDemo } from './afiliado/afiliado.demo';
import { AfiliadoAdministrarDemo } from './afiliado/administrar/afiliado-administrar';
import { BeneficiarioAdministrarDemo } from './beneficiario/administrar/beneficiario-administrar';
import { SolicitudpensionAdministrarDemo } from './solicitudpension/administrar/solicitudpension-administrar';
import { TipopensionAdministrarDemo } from './tipopension/administrar/tipopension-administrar';
import { AfiliadoAgregarFormDemo } from './afiliado/agregar/afiliado-agregar-form';
import { AfiliadoEliminarDemo } from './afiliado/eliminar/afiliado-eliminar';
import { AfiliadoAgregarDemo } from './afiliado/agregar/afiliado-agregar';
import { AfiliadoEditarDemo } from './afiliado/editar/afiliado-editar';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          { path: 'afiliado', loadChildren: 'src/app/admin/afiliado/afiliado.demo.module#AfiliadoDemoModule' },
          {
            path: 'beneficiario',
            loadChildren: 'src/app/admin/beneficiario/beneficiario.demo.module#BeneficiarioDemoModule',
          },
          {
            path: 'tipopension',
            loadChildren: 'src/app/admin/tipopension/tipopension.demo.module#TipopensionDemoModule',
          },
          {
            path: 'solicitudpension',
            loadChildren: 'src/app/admin/solicitudpension/solicitudpension.demo.module#SolicitudpensionDemoModule',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
