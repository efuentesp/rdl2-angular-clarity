/* PSG  User Module */
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ROUTING } from "./user.psg.routing";
import { UserService } from "./user.psg.service";
import { UserDemo } from "./user.psg";
import { UserAdministrarDemo } from "./administrar/user-administrar";
//import { UserAgregarDemo } from './agregar/user-agregar';
import { UserAgregarFormDemo } from "./agregar/user-agregar-form";
// import { RolService } from '../rol/rol.psg.service';
import { UserEditarFormDemo } from "./editar/user-editar-form";
import { UserEliminarFormDemo } from "./eliminar/user-eliminar-form";
import { RolService } from "../rol/rol.psg.service";
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
    UserDemo,
    UserAdministrarDemo,
    UserAgregarFormDemo,
    UserEditarFormDemo,
    UserEliminarFormDemo,
  ],
  exports: [
    UserDemo,
    UserAdministrarDemo,
    UserAgregarFormDemo,
    UserEditarFormDemo,
    UserEliminarFormDemo,
  ],
  providers: [UserService, RolService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserDemoModule {}
