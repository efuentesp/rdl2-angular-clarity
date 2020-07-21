import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { AdminComponent } from "../admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
  {
    path: "admin",
    loadChildren: "src/app/admin/admin.module#AdminModule",
    canActivate: [AuthGuard],
  },
  {
    path: "home",
    component: PagesComponent,
    children: [{ path: "", component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
