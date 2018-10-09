import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
import { AfiliadoDemoModule } from './afiliado/afiliado.demo.module';
import { BeneficiarioDemoModule } from './beneficiario/beneficiario.demo.module';
import { SolicitudpensionDemoModule } from './solicitudpension/solicitudpension.demo.module';
import { TipopensionDemoModule } from './tipopension/tipopension.demo.module';
// import { TipopensionDemoModule } from './tipopension/tipopension.demo.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    AfiliadoDemoModule,
    BeneficiarioDemoModule,
    TipopensionDemoModule,
    SolicitudpensionDemoModule,
    HttpClientModule,
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,

    // SearchUserPipe,
    //AfiliadoDemo,
    // UserCreateComponent,
    // AfiliadoAdministrarDemo,
    // BeneficiarioAdministrarDemo,
    // TipopensionAdministrarDemo,
    // SolicitudpensionAdministrarDemo,
    // AfiliadoAgregarDemo,
    // AfiliadoEditarDemo,
    // AfiliadoEliminarDemo,
  ],
  providers: [
    AfiliadoService,
    BeneficiarioService,
    TipopensionService,
    SolicitudpensionService,

    // {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('dd/MM/yyyy')}
  ],
})
export class AdminModule {}
