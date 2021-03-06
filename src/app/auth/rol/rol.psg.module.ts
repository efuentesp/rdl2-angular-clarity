/* PSG  Rol Module */
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ROUTING } from "./rol.psg.routing";
import { RolDemo } from "./rol.psg";
import { RolAdministrarDemo } from "./administrar/rol-administrar";
import { RolService } from "./rol.psg.service";
import { RolAgregarDemo } from "./agregar/rol-agregar";
import { RolEditarDemo } from "./editar/rol-editar";
import { RolEliminarDemo } from "./eliminar/rol-eliminar";
import { RoleAgregarFormDemo } from "./agregar/rol-agregar-form";
import { RolEditarFormDemo } from "./editar/rol-editar-form";
import { RolEliminarFormDemo } from "./eliminar/rol-eliminar-form";
import { CommonClarityModule } from "src/app/common/common-clarity.module";

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ROUTING,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    CommonClarityModule,
  ],
  declarations: [
    RolDemo,
    RolAdministrarDemo,
    RolAgregarDemo,
    RolEditarDemo,
    RolEliminarDemo,
    RoleAgregarFormDemo,
    RolEditarFormDemo,
    RolEliminarFormDemo,
  ],
  exports: [
    RolDemo,
    RolAdministrarDemo,
    RolAgregarDemo,
    RolEditarDemo,
    RolEliminarDemo,
    RoleAgregarFormDemo,
    RolEditarFormDemo,
    RolEliminarFormDemo,
  ],
  providers: [RolService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RolDemoModule {}
