import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitudpension } from './solicitudpension.demo.model';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class SolicitudpensionService {
  private env: any = environment;
  private solicitudpension = new Solicitudpension();
  private token: string;

  constructor(private http: HttpClient) {}

  postGuardaSolicitudpension(solicitudpension) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .post<any>(`${environment.apiUrl}/api/v1/solicitudpension`, { headers: headers })
      .pipe(map(res => res));
  }

  getRecuperaSolicitudpensions() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .get<any>(`${environment.apiUrl}/api/v1/solicitudpension`, { headers: headers })
      .pipe(map(res => res));
  }

  deleteSolicitudpension(solicitudpension) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .delete<any>(`${environment.apiUrl}/api/v1/solicitudpension/` + solicitudpension.id, { headers: headers })
      .pipe(map(res => res));
  }

  updateEditaSolicitudpension(solicitudpension) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http
      .post<any>(`${environment.apiUrl}/api/v1/solicitudpension/` + solicitudpension.id, solicitudpension, {
        headers: headers,
      })
      .pipe(map(res => res));
  }

  resetSolicitudpension(): Solicitudpension {
    this.clear();
    return this.solicitudpension;
  }

  getSolicitudpension(): Solicitudpension {
    var solicitudpension: Solicitudpension = {
      id: this.solicitudpension.id,
      numero: this.solicitudpension.numero,
      afiliado1Id: this.solicitudpension.afiliado1Id,
      afiliado1Item: this.solicitudpension.afiliado1Item,
      tipopension1Id: this.solicitudpension.tipopension1Id,
      tipopension1Item: this.solicitudpension.tipopension1Item,
      fechasolicitud: this.solicitudpension.fechasolicitud,
      observaciones: this.solicitudpension.observaciones,
    };
    return solicitudpension;
  }

  setSolicitudpension(solicitudpension: Solicitudpension) {
    (this.solicitudpension.id = solicitudpension.id),
      (this.solicitudpension.numero = solicitudpension.numero),
      (this.solicitudpension.afiliado1Id = solicitudpension.afiliado1Id),
      (this.solicitudpension.afiliado1Item = solicitudpension.afiliado1Item),
      (this.solicitudpension.tipopension1Id = solicitudpension.tipopension1Id),
      (this.solicitudpension.tipopension1Item = solicitudpension.tipopension1Item),
      (this.solicitudpension.fechasolicitud = solicitudpension.fechasolicitud),
      (this.solicitudpension.observaciones = solicitudpension.observaciones);
  }

  clear() {
    this.solicitudpension.id = null;
    this.solicitudpension.numero = null;
    this.solicitudpension.observaciones = '';
    this.solicitudpension.afiliado1Id = '';
    this.solicitudpension.afiliado1Item = '';
    this.solicitudpension.tipopension1Id = '';
    this.solicitudpension.afiliado1Id = null;
    this.solicitudpension.afiliado1Item = '';
    this.solicitudpension.fechasolicitud = null;
    this.solicitudpension.observaciones = '';
  }
}
