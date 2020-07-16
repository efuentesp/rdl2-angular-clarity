/* PSG  Permission Module */
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ROUTING } from "./permission.psg.routing";
import { PermissionService } from "./permission.psg.service";
import { PermissionDemo } from "./permission.psg";
import { PermissionAdministrarDemo } from "./administrar/permission-administrar";

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ROUTING,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [PermissionDemo, PermissionAdministrarDemo],
  exports: [PermissionDemo, PermissionAdministrarDemo],
  providers: [PermissionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PermissionDemoModule {}
