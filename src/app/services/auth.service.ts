import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "../models/usuario";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) {}

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem("usuario") != null
    ) {
      this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem("token") != null) {
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = `${environment.apiUrl}/auth/login`;
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json; charset=utf-8");
    return this.http.post<any>(
      urlEndpoint,
      { email: usuario.email, password: usuario.password },
      {
        headers: headers,
      }
    );
  }

  getProfile(accessToken: string) {
    const urlEndpoint = `${environment.apiUrl}/auth/profile`;

    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + accessToken + ""
    );
    return this.http.get<any>(urlEndpoint, {
      headers: headers,
    });
  }

  guardarUsuario(response: any, token: string): void {
    this._usuario = new Usuario();
    this._usuario.display_name = response.user.display_name;
    this._usuario.email = response.user.email;
    this._usuario.username = response.user.username;
    this._usuario.user_enabled = response.user.user_enabled;
    this._usuario.role = response.user.role;
    this._usuario.role_enabled = response.user.role_enabled;
    this._usuario.permissions = response.permissions;
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario));
    sessionStorage.setItem("token", token);
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem("token", accessToken);
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem("usuario") != null) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    // if (this.usuario.roles.includes(role)) {
    //   return true;
    // }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
  }
}
