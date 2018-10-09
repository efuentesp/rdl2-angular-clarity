import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Afiliado } from './afiliado.demo.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AfiliadoService {
  private env: any = environment;
  afiliado = new Afiliado();
  private token: string;

  constructor(private http: HttpClient) {}

  postGuardaAfiliado(afiliado) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .post<any>(`${environment.apiUrl}/api/v1/afiliado`, afiliado, { headers: headers })
      .pipe(map(res => res));
  }

  getRecuperaAfiliados() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.get<any>(`${environment.apiUrl}/api/v1/afiliado`, { headers: headers }).pipe(map(res => res));
  }

  getRecuperaAfiliadoPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .get<any>(`${environment.apiUrl}/api/v1/afiliado/` + id, { headers: headers })
      .pipe(map(res => res));
  }

  deleteAfiliado(afiliado) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .delete<any>(`${environment.apiUrl}/api/v1/afiliado/` + afiliado.id, { headers: headers })
      .pipe(map(res => res));
  }

  updateEditaAfiliado(afiliado) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .put<any>(`${environment.apiUrl}/api/v1/afiliado/` + afiliado.id, afiliado, { headers: headers })
      .pipe(map(res => res));
  }

  resetAfiliado(): Afiliado {
    this.clear();
    return this.afiliado;
  }

  getAfiliado(): Afiliado {
    var afiliado: Afiliado = {
      id: this.afiliado.id,
      nss: this.afiliado.nss,
      actanacimiento: this.afiliado.actanacimiento,
      apellidomaterno: this.afiliado.apellidomaterno,
      apellidopaterno: this.afiliado.apellidopaterno,
      beneficiario1Id: this.afiliado.beneficiario1Id,
      beneficiario1Item: this.afiliado.beneficiario1Item,
      correo: this.afiliado.correo,
      fechaafiliacion: this.afiliado.fechaafiliacion,
      foto: this.afiliado.foto,
      genero1Id: this.afiliado.genero1Id,
      genero1Item: this.afiliado.genero1Item,
      nombre: this.afiliado.nombre,
      numero: this.afiliado.numero,
      observaciones: this.afiliado.observaciones,
      semanascotizadas: this.afiliado.semanascotizadas,
      nivel: this.afiliado.nivel,
      orders: this.afiliado.orders,
    };
    console.log('Afiliado GET : ', afiliado);
    return afiliado;
  }

  setAfiliado(afiliado: Afiliado) {
    (this.afiliado.id = afiliado.id),
      (this.afiliado.nss = afiliado.nss),
      (this.afiliado.actanacimiento = afiliado.actanacimiento),
      (this.afiliado.apellidomaterno = afiliado.apellidomaterno),
      (this.afiliado.apellidopaterno = afiliado.apellidopaterno),
      (this.afiliado.beneficiario1Id = afiliado.beneficiario1Id),
      (this.afiliado.beneficiario1Item = afiliado.beneficiario1Item),
      (this.afiliado.correo = afiliado.correo),
      (this.afiliado.fechaafiliacion = afiliado.fechaafiliacion),
      (this.afiliado.foto = afiliado.foto),
      (this.afiliado.genero1Id = afiliado.genero1Id),
      (this.afiliado.genero1Item = afiliado.genero1Item),
      (this.afiliado.nombre = afiliado.nombre),
      (this.afiliado.numero = afiliado.numero),
      (this.afiliado.observaciones = afiliado.observaciones),
      (this.afiliado.semanascotizadas = afiliado.semanascotizadas),
      (this.afiliado.nivel = afiliado.nivel),
      (this.afiliado.orders = afiliado.orders);
    console.log('Afiliado SET : ', this.afiliado);
  }

  clear() {
    this.afiliado.id = null;
    this.afiliado.nss = null;
    this.afiliado.actanacimiento = '';
    this.afiliado.apellidomaterno = '';
    this.afiliado.apellidopaterno = '';
    this.afiliado.beneficiario1Id = '';
    this.afiliado.beneficiario1Item = '';
    this.afiliado.correo = '';
    this.afiliado.fechaafiliacion = null;
    this.afiliado.foto = '';
    this.afiliado.genero1Id = '';
    this.afiliado.genero1Item = '';
    this.afiliado.nombre = '';
    this.afiliado.numero = null;
    this.afiliado.observaciones = '';
    this.afiliado.semanascotizadas = null;
    this.afiliado.nivel = null;
    this.afiliado.orders = null;
  }
}
