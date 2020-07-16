/* PSG  Rol Service */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Rol } from "./rol.psg.model";
import { HttpModule, Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class RolService {
  private env: any = environment;
  private token: string;
  rol = new Rol();

  constructor(private http: HttpClient) {}

  postGuardaRol(rol) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .post<any>(`${environment.apiUrl}/auth/roles`, rol, { headers: headers })
      .pipe(map((res) => res));
  }

  getRecuperaRol() {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/roles`, { headers: headers })
      .pipe(map((res) => res));
  }

  getRecuperaRolPorId(id) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/roles/` + id, { headers: headers })
      .pipe(map((res) => res));
  }

  deleteRol(id) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .delete<any>(`${environment.apiUrl}/auth/roles/` + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  updateEditaRol(rol, id) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .put<any>(`${environment.apiUrl}/auth/roles/` + id, rol, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  resetRol(): Rol {
    this.clear();
    return this.rol;
  }

  getRol(): Rol {
    var rol: Rol = {
      name: this.rol.name,
      description: this.rol.description,
      enabled: this.rol.enabled,
      id: this.rol.id,
    };
    return rol;
  }

  setRol(rol: Rol) {
    this.rol.name = rol.name;
    this.rol.description = rol.description;
    this.rol.enabled = rol.enabled;
    this.rol.id = rol.id;
  }

  clear() {
    this.rol.name = null;
    this.rol.description = null;
    this.rol.enabled = null;
    this.rol.id = null;
  }
}
