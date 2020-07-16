/* PSG  User Service */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpModule, Http } from "@angular/http";
import { environment } from "../../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from "./user.psg.model";

@Injectable()
export class UserService {
  private env: any = environment;
  private token: string;
  user = new User();

  constructor(private http: HttpClient) {}

  postGuardaUser(user) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .post<any>(`${environment.apiUrl}/auth/users`, user, { headers: headers })
      .pipe(map((res) => res));
  }

  getRecuperaUser() {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/users`, { headers: headers })
      .pipe(map((res) => res));
  }

  getRecuperaUserPorId(id) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .get<any>(`${environment.apiUrl}/auth/users/` + id, { headers: headers })
      .pipe(map((res) => res));
  }

  deleteUser(id) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .delete<any>(`${environment.apiUrl}/auth/users/` + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  updateEditaUser(user, id) {
    let obj = JSON.parse(sessionStorage.getItem("usuario"));
    this.token = sessionStorage.getItem("token");
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.token
    );
    return this.http
      .put<any>(`${environment.apiUrl}/auth/users/` + id, user, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  resetUser(): User {
    this.clear();
    return this.user;
  }

  getUser(): User {
    var user: User = {
      username: this.user.username,
      display_name: this.user.display_name,
      email: this.user.email,
      password: this.user.password,
      enabled: this.user.enabled,
      roleId: this.user.roleId,
    };
    return user;
  }

  setUser(user: User) {
    this.user.username = user.username;
    this.user.display_name = user.display_name;
    this.user.email = user.email;
    this.user.password = user.password;
    this.user.enabled = user.enabled;
    this.user.roleId = user.roleId;
  }

  clear() {
    this.user.username = null;
    this.user.display_name = null;
    this.user.email = null;
    this.user.password = null;
    this.user.enabled = null;
    this.user.roleId = null;
  }
}
