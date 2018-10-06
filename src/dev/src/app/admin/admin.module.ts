import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { NgxPaginationModule}  from 'ngx-pagination';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.component.service';
import { SearchUserPipe } from './pipe/user.filter.pipe';
import { UserCreateComponent } from './user/createUser/user-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AfiliadoDemo } from './afiliado/afiliado.demo';
import { AfiliadoService } from './afiliado/afiliado.demo.service';
import { AfiliadoAdministrarDemo } from './afiliado/administrar/afiliado-administrar';
import { Beneficiario } from './beneficiario/beneficiario.demo.model';
import { BeneficiarioAdministrarDemo } from './beneficiario/administrar/beneficiario-administrar';
import { TipopensionAdministrarDemo } from './tipopension/administrar/tipopension-administrar';
import { SolicitudpensionAdministrarDemo } from './solicitudpension/administrar/solicitudpension-administrar';
import { BeneficiarioService } from './beneficiario/beneficiario.demo.service';
import { TipopensionService } from './tipopension/tipopension.demo.service';
import { SolicitudpensionService } from './solicitudpension/solicitudpension.demo.service';
import { AfiliadoAgregarDemo } from './afiliado/agregar/afiliado-agregar';
import { AfiliadoEditarDemo } from './afiliado/editar/afiliado-editar';
import { AfiliadoEliminarDemo } from './afiliado/eliminar/afiliado-eliminar';

@NgModule({
  imports: [
    AdminRoutingModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,

    HttpClientModule,
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,

    SearchUserPipe,

    UserCreateComponent,
    AfiliadoAdministrarDemo,
    BeneficiarioAdministrarDemo,
    TipopensionAdministrarDemo,
    SolicitudpensionAdministrarDemo,
    AfiliadoAgregarDemo,
    AfiliadoEditarDemo,
    AfiliadoEliminarDemo,
  ],
  providers: [
    UserService,
    AfiliadoService,
    BeneficiarioService,
    TipopensionService,
    SolicitudpensionService,

    // {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('dd/MM/yyyy')}
  ],
})
export class AdminModule {}
