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

import { PermissionDemoModule } from './permission/permission.psg.module';
import { UserDemoModule } from './user/user.psg.module';
import { AdministracionDemoModule } from './administracion/administracion.psg.module';
import { RolDemoModule } from './rol/rol.psg.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    PermissionDemoModule,
    UserDemoModule,
    AdministracionDemoModule,
    RolDemoModule,
  ],
  declarations: [AdminComponent, AdminDashboardComponent],
  providers: [SelectivePreloadingStrategy, [{ provide: LOCALE_ID, useValue: 'es-MX' }]],
})
export class AdminModule {}
