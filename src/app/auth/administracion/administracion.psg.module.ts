/* PSG  Permission Module */
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ROUTING } from "./administracion.psg.routing";
import { AdministracionDemo } from "./administracion.psg";
import { AdministracionAdministrarDemo } from "./administrar/administracion-administrar";
import { PermissionService } from "../permission/permission.psg.service";

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ROUTING,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [AdministracionDemo, AdministracionAdministrarDemo],
  exports: [AdministracionDemo, AdministracionAdministrarDemo],
  providers: [PermissionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdministracionDemoModule {}
