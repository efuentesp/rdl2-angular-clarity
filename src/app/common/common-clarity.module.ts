import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { FormboxComponent } from './layout/formbox/formbox.component';
import { PageComponent } from './layout/page/page.component';
import { InputboxComponent } from './form/inputbox/inputbox.component';
import { DatepickerComponent } from './form/datepicker/datepicker.component';
import { SelectComponent } from './form/select/select.component';
import localeMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { BrowserModule } from '@angular/platform-browser';
import { OutputboxComponent } from './form/outputbox/outputbox.component';

registerLocaleData(localeMx, 'es-MX');

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ClarityModule
  ],
  declarations: [
    FooterComponent,
    FormboxComponent,
    PageComponent,
    DatepickerComponent,
    InputboxComponent,
    SelectComponent,
    OutputboxComponent
  ],
  exports: [
    FooterComponent,
    FormboxComponent,
    PageComponent,
    DatepickerComponent,
    InputboxComponent,
    SelectComponent,
    OutputboxComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [[{ provide: LOCALE_ID, useValue: 'es-MX' }]]
})
export class CommonClarityModule { }
