/* PSG  Certificacion Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Certificacion } from './certificacion.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CertificacionService {
  private env: any = environment;
  private token: string;
  certificacion = new Certificacion();

  constructor(private http: Http) {}

  postGuardaCertificacion(certificacion) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/admincontenido/certificacion`, certificacion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCertificacion() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCertificacionPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteCertificacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/admincontenido/certificacion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaCertificacion(certificacion, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/admincontenido/certificacion/` + id, certificacion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCertificacionPorOpcion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?opcionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorPregunta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?preguntaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorExamen(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?examenId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorPublicacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?publicacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorPrograma(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?programaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorGrupoa(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?grupoaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorRecurso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?recursoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorUnidad(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?unidadId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorProfesor(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?profesorId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorEstudiante(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?estudianteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorRegistro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?registroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorInstitucion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?institucionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCertificacionPorEvento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/certificacion?eventoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetCertificacion(): Certificacion {
    this.clear();
    return this.certificacion;
  }

  getCertificacion(): Certificacion {
    var certificacion: Certificacion = {
      tieneId: this.certificacion.tieneId,
      tieneItem: this.certificacion.tieneItem,
      sonId: this.certificacion.sonId,
      sonItem: this.certificacion.sonItem,
      idcertificacion: this.certificacion.idcertificacion,
      fechacertificacion: this.certificacion.fechacertificacion,
      fechacertificacionAux: this.certificacion.fechacertificacionAux,
    };
    return certificacion;
  }

  setCertificacion(certificacion: Certificacion) {
    this.certificacion.tieneId = certificacion.tieneId;
    this.certificacion.tieneItem = certificacion.tieneItem;
    this.certificacion.sonId = certificacion.sonId;
    this.certificacion.sonItem = certificacion.sonItem;
    this.certificacion.idcertificacion = certificacion.idcertificacion;
    this.certificacion.fechacertificacion = certificacion.fechacertificacion;
    this.certificacion.fechacertificacionAux = certificacion.fechacertificacionAux;
  }

  clear() {
    this.certificacion.tieneId = null;
    this.certificacion.tieneItem = null;
    this.certificacion.sonId = null;
    this.certificacion.sonItem = null;
    this.certificacion.idcertificacion = null;
    this.certificacion.fechacertificacion = null;
    this.certificacion.fechacertificacionAux = null;
  }
}
