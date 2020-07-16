import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import swal from "sweetalert2";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("Can Activate");
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return false;
    }

    let role = next.data["role"] as string;
    console.log(role);
    if (this.authService.hasRole(role)) {
      return true;
    }
    // swal(
    //   "Acceso denegado",
    //   `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,
    //   "warning"
    // );
    console.log("no tienes acceso a este recurso!");
    this.router.navigate(["/clientes"]);
    return false;
  }
}
