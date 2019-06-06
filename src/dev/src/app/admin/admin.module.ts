/** PSG Admin Module **/
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import localeMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';

registerLocaleData(localeMx, 'es-MX');

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    AdminRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AdminComponent],
  providers: [[{ provide: LOCALE_ID, useValue: 'es-MX' }]],
})
export class AdminModule {}
