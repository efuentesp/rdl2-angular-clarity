import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ClarityModule } from "@clr/angular";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { AdminModule } from "../admin/admin.module";

@NgModule({
  declarations: [HomeComponent, PagesComponent],
  exports: [HomeComponent, PagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    HttpClientModule,
    AdminModule,
  ],
})
export class PagesModule {}
