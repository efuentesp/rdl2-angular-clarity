import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      if (this.isTokenExpirado()) {
        this.authService.logout();
        this.router.navigate(["/login"]);
        return false;
      }
      return true;
    }
  }

  isTokenExpirado(): boolean {
    let token = this.authService.token;
    const decoded = jwt_decode(token);
    let now = new Date().getTime() / 1000;
    //console.log("now " + now);
    //console.log("decoded.exp " + decoded.exp);
    // decoded.exp = 1598078295.331;
    // now = 1598081608;
    if (decoded.exp < now) {
      return true;
    }
    return false;
  }
}
