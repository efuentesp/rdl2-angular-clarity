/** PSG Module **/
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import localeMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeMx, 'es-MX');

import { OpcionDemoModule } from './opcion/opcion.psg.module';
import { OpcionService } from './opcion/opcion.psg.service';
import { PreguntaDemoModule } from './pregunta/pregunta.psg.module';
import { PreguntaService } from './pregunta/pregunta.psg.service';
import { ExamenDemoModule } from './examen/examen.psg.module';
import { ExamenService } from './examen/examen.psg.service';
import { PublicacionDemoModule } from './publicacion/publicacion.psg.module';
import { PublicacionService } from './publicacion/publicacion.psg.service';
import { ProgramaDemoModule } from './programa/programa.psg.module';
import { ProgramaService } from './programa/programa.psg.service';
import { GrupoaDemoModule } from './grupoa/grupoa.psg.module';
import { GrupoaService } from './grupoa/grupoa.psg.service';
import { RecursoDemoModule } from './recurso/recurso.psg.module';
import { RecursoService } from './recurso/recurso.psg.service';
import { UnidadDemoModule } from './unidad/unidad.psg.module';
import { UnidadService } from './unidad/unidad.psg.service';
import { CertificacionDemoModule } from './certificacion/certificacion.psg.module';
import { CertificacionService } from './certificacion/certificacion.psg.service';
import { ProfesorDemoModule } from './profesor/profesor.psg.module';
import { ProfesorService } from './profesor/profesor.psg.service';
import { EstudianteDemoModule } from './estudiante/estudiante.psg.module';
import { EstudianteService } from './estudiante/estudiante.psg.service';
import { RegistroDemoModule } from './registro/registro.psg.module';
import { RegistroService } from './registro/registro.psg.service';
import { InstitucionDemoModule } from './institucion/institucion.psg.module';
import { InstitucionService } from './institucion/institucion.psg.service';
import { EventoDemoModule } from './evento/evento.psg.module';
import { EventoService } from './evento/evento.psg.service';

import { PermissionDemoModule } from './permission/permission.psg.module';
import { UserDemoModule } from './user/user.psg.module';
import { AdministracionDemoModule } from './administracion/administracion.psg.module';
//  import { RolDemoModule } from './rol/rol.psg.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,
    OpcionDemoModule,
    PreguntaDemoModule,
    ExamenDemoModule,
    PublicacionDemoModule,
    ProgramaDemoModule,
    GrupoaDemoModule,
    RecursoDemoModule,
    UnidadDemoModule,
    CertificacionDemoModule,
    ProfesorDemoModule,
    EstudianteDemoModule,
    RegistroDemoModule,
    InstitucionDemoModule,
    EventoDemoModule,
    PermissionDemoModule,
    UserDemoModule,
    AdministracionDemoModule,
    //  RolDemoModule
  ],
  declarations: [AdminComponent, AdminDashboardComponent],
  providers: [
    OpcionService,
    PreguntaService,
    ExamenService,
    PublicacionService,
    ProgramaService,
    GrupoaService,
    RecursoService,
    UnidadService,
    CertificacionService,
    ProfesorService,
    EstudianteService,
    RegistroService,
    InstitucionService,
    EventoService,
    SelectivePreloadingStrategy,
    [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  ],
})
export class AdminModule {}
