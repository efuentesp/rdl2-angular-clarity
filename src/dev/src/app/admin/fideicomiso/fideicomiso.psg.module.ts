/* PSG  Fideicomiso Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { FideicomisoRoutingModule } from './fideicomiso.psg.routing';
import { FideicomisoService } from './fideicomiso.psg.service';
import { FideicomisoAdministrar } from './administrar/fideicomiso-administrar';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    FideicomisoRoutingModule,
  ],
  declarations: [FideicomisoAdministrar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService],
})
export class FideicomisoModule {}
