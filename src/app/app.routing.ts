// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

// Modulos
import { PagesRoutingModule } from "./pages/pages.routing";
import { AuthRoutingModule } from "./auth/auth.routing";
import { NopagefoundComponent } from "./nonpagefound/nopagefound.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
