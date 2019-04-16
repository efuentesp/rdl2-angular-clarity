/** PSG Routing **/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthGuard } from '../_guards';

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
          {
            path: 'opcion',
            loadChildren: 'src/app/admin/opcion/opcion.psg.module#OpcionDemoModule',
          },
          {
            path: 'pregunta',
            loadChildren: 'src/app/admin/pregunta/pregunta.psg.module#PreguntaDemoModule',
          },
          {
            path: 'examen',
            loadChildren: 'src/app/admin/examen/examen.psg.module#ExamenDemoModule',
          },
          {
            path: 'publicacion',
            loadChildren: 'src/app/admin/publicacion/publicacion.psg.module#PublicacionDemoModule',
          },
          {
            path: 'programa',
            loadChildren: 'src/app/admin/programa/programa.psg.module#ProgramaDemoModule',
          },
          {
            path: 'grupoa',
            loadChildren: 'src/app/admin/grupoa/grupoa.psg.module#GrupoaDemoModule',
          },
          {
            path: 'recurso',
            loadChildren: 'src/app/admin/recurso/recurso.psg.module#RecursoDemoModule',
          },
          {
            path: 'unidad',
            loadChildren: 'src/app/admin/unidad/unidad.psg.module#UnidadDemoModule',
          },
          {
            path: 'certificacion',
            loadChildren: 'src/app/admin/certificacion/certificacion.psg.module#CertificacionDemoModule',
          },
          {
            path: 'profesor',
            loadChildren: 'src/app/admin/profesor/profesor.psg.module#ProfesorDemoModule',
          },
          {
            path: 'estudiante',
            loadChildren: 'src/app/admin/estudiante/estudiante.psg.module#EstudianteDemoModule',
          },
          {
            path: 'registro',
            loadChildren: 'src/app/admin/registro/registro.psg.module#RegistroDemoModule',
          },
          {
            path: 'institucion',
            loadChildren: 'src/app/admin/institucion/institucion.psg.module#InstitucionDemoModule',
          },
          {
            path: 'evento',
            loadChildren: 'src/app/admin/evento/evento.psg.module#EventoDemoModule',
          },
          {
            path: 'administracion',
            loadChildren: 'src/app/admin/administracion/administracion.psg.module#AdministracionDemoModule',
          },
          {
            path: 'user',
            loadChildren: 'src/app/admin/user/user.psg.module#UserDemoModule',
          },
          // {
          //   path: 'rol',
          //   loadChildren: 'src/app/admin/rol/rol.psg.module#RolDemoModule',
          // }
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
