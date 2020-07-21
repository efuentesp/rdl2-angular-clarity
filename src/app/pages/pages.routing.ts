import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { AdminComponent } from "../admin/admin.component";
import { BeginComponent } from "./begin/begin.component";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
  {
    path: "admin",
    loadChildren: "src/app/admin/admin.module#AdminModule",
    canActivate: [AuthGuard],
  },
  {
    path: "begin",
    component: PagesComponent,
    children: [{ path: "", component: BeginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
