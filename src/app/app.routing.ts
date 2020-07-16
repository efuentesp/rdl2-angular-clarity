import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login";
import { AuthGuard } from "./guards/auth.guard";

export const APP_ROUTES: Routes = [
  {
    path: "admin",
    loadChildren: "src/app/admin/admin.module#AdminModule",
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
