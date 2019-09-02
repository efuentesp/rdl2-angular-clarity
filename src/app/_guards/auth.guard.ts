import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "../_services";
import Swal from "sweetalert2";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }
  token: string = "";

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("canActivate() AuthGuard");
    var obj = JSON.parse(localStorage.getItem("currentUser"));

    if (obj["access_token"] === undefined) {
      this.token = '';
    } else {
      this.token = obj["access_token"];
    }

    this.authService.setToken(this.token);

    if (!this.authService.isTokenExpired()) {
      return true;
    }

    Swal.fire("Error...", "Token expired.", "error");
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
