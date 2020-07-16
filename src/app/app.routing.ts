import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// import { AuthGuard } from "./_guards";
import { AdminModule } from "./admin/admin.module";
import { LoginComponent } from "./login/login";
import { AuthGuard } from "./guards/auth.guard";

export const APP_ROUTES: Routes = [
  {
    path: "admin",
    loadChildren: "src/app/admin/admin.module#AdminModule",
    canActivate: [AuthGuard],
  },
  // { path: "**", redirectTo: "", component: LoginComponent }

  { path: "**", redirectTo: "", component: LoginComponent },
  // { path: 'directivas', component: DirectivaComponent },
  // { path: 'clientes', component: ClientesComponent },
  // { path: 'clientes/page/:page', component: ClientesComponent },
  // { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  // { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
