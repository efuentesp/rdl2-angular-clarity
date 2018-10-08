import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tipopension } from './tipopension.demo.model';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class TipopensionService {
  private env: any = environment;
  private tipopension = new Tipopension();
  private token: string;

  constructor(private http: HttpClient) {}

  postGuardaTipopension(tipopension) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.post<any>(`${environment.apiUrl}/api/v1/tipopension`, { headers: headers }).pipe(map(res => res));
    //return this.http.post(this.env.api + '/tipopension', tipopension).pipe(map(res => res));
  }

  getRecuperaTipopensions() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.get<any>(`${environment.apiUrl}/api/v1/tipopension`, { headers: headers }).pipe(map(res => res));
    //return this.http.get(this.env.api + '/tipopension').pipe(map(res => res.json()));
  }

  deleteTipopension(tipopension) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .delete<any>(`${environment.apiUrl}/api/v1/tipopension/` + tipopension.id, { headers: headers })
      .pipe(map(res => res));
    //return this.http.delete(this.env.api + '/tipopension/' + tipopension.id).pipe(map(res => res));
  }

  updateEditaTipopension(tipopension) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .post<any>(`${environment.apiUrl}/api/v1/tipopension/` + tipopension.id, tipopension, { headers: headers })
      .pipe(map(res => res));
    //return this.http.put(this.env.api + '/tipopension/' + tipopension.id, tipopension).pipe(map(res => res));
  }

  resetTipopension(): Tipopension {
    this.clear();
    return this.tipopension;
  }

  getTipopension(): Tipopension {
    var tipopension: Tipopension = {
      id: this.tipopension.id,
      clave: this.tipopension.clave,
      nombre: this.tipopension.nombre,
    };
    return tipopension;
  }

  setTipopension(tipopension: Tipopension) {
    (this.tipopension.id = tipopension.id),
      (this.tipopension.clave = tipopension.clave),
      (this.tipopension.nombre = tipopension.nombre);
  }

  clear() {
    this.tipopension.id = null;
    this.tipopension.clave = null;
    this.tipopension.nombre = '';
  }
}
