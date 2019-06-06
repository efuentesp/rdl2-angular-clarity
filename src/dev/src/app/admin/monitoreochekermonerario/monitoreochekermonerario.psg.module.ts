/* PSG  Monitoreochekermonerario Module */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { MonitoreochekermonerarioRoutingModule } from './monitoreochekermonerario.psg.routing';
import { MonitoreochekermonerarioService } from './monitoreochekermonerario.psg.service';
import { MonitoreochekermonerarioAdministrar } from './administrar/monitoreochekermonerario-administrar';
import { MonitoreochekermonerarioAgregarForm } from './agregar/monitoreochekermonerario-agregar-form';
import { MonitoreochekermonerarioEditarForm } from './editar/monitoreochekermonerario-editar-form';
import { MonitoreochekermonerarioEliminarForm } from './eliminar/monitoreochekermonerario-eliminar-form';

import { FideicomisoService } from '../fideicomiso/fideicomiso.psg.service';
import { SubfisoService } from '../subfiso/subfiso.psg.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,

    MonitoreochekermonerarioRoutingModule,
  ],
  declarations: [
    MonitoreochekermonerarioAdministrar,
    MonitoreochekermonerarioAgregarForm,
    MonitoreochekermonerarioEditarForm,
    MonitoreochekermonerarioEliminarForm,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FideicomisoService, SubfisoService, MonitoreochekermonerarioService],
})
export class MonitoreochekermonerarioModule {}
