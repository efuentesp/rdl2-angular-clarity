/* PSG  Afiliado Service */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpModule, Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class PermissionService {
  private env: any = environment;
  private token: string;

  constructor(private http: HttpClient) {}

  getAllPrivilege() {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/permissionsvsroles`, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  removePermission(permission) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .post<any>(
        `${environment.apiUrl}/auth/remove_role_permission`,
        permission,
        { headers: headers }
      )
      .pipe(map((res) => res));
  }

  assignPermission(permission) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .post<any>(
        `${environment.apiUrl}/auth/assign_role_permission`,
        permission,
        { headers: headers }
      )
      .pipe(map((res) => res));
  }

  getAllPermission() {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/permissions`, { headers: headers })
      .pipe(map((res) => res));
  }

  postGuardaPermission(permission) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .post<any>(`${environment.apiUrl}/auth/permissions`, permission, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
}
