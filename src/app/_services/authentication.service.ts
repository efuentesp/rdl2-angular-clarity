import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Permission } from "../_models/permission";
import { User } from "../_models";
import * as jwt_decode from "jwt-decode";

export const TOKEN_NAME: string = "jwt_token";

@Injectable()
export class AuthenticationService {
  public user: User;
  public permissions: Permission[] = [];

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log("login() AuthenticationService");
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");

    return this.http
      .post<any>(
        `${environment.apiUrl}/auth/login`,
        { email: email, password: password },
        { headers: headers }
      )
      .pipe(
        map(response => {
          if (response) {
            localStorage.setItem("currentUser", JSON.stringify(response));
          }
          return response;
        })
      );
  }

  getUser(token) {
    console.log("getUser() AuthenticationService");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + token + ""
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/profile`, { headers: headers })
      .pipe(
        map(response => {
          this.permissions = response.permissions;
          this.user = response.user;

          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              user: this.user,
              token: token,
              permissions: this.permissions
            })
          );

          return true;
        })
      );
  }

  logout() {
    console.log("logout() AuthenticationService");
    localStorage.removeItem("currentUser");
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    console.log("Expiration Date: ", date);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }
}
