/* PSG  Unidad Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Unidad } from './unidad.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UnidadService {
  private env: any = environment;
  private token: string;
  unidad = new Unidad();

  constructor(private http: Http) {}

  postGuardaUnidad(unidad) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/admincontenido/unidad`, unidad, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaUnidad() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaUnidadPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteUnidad(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/admincontenido/unidad/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaUnidad(unidad, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/admincontenido/unidad/` + id, unidad, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaUnidadPorOpcion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?opcionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorPregunta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?preguntaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorExamen(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?examenId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorPublicacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?publicacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorPrograma(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?programaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorGrupoa(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?grupoaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorRecurso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?recursoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorCertificacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?certificacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorProfesor(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?profesorId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorEstudiante(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?estudianteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorRegistro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?registroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorInstitucion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?institucionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaUnidadPorEvento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/unidad?eventoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetUnidad(): Unidad {
    this.clear();
    return this.unidad;
  }

  getUnidad(): Unidad {
    var unidad: Unidad = {
      competeId: this.unidad.competeId,
      competeItem: this.unidad.competeItem,
      nombreunidad: this.unidad.nombreunidad,
    };
    return unidad;
  }

  setUnidad(unidad: Unidad) {
    this.unidad.competeId = unidad.competeId;
    this.unidad.competeItem = unidad.competeItem;
    this.unidad.nombreunidad = unidad.nombreunidad;
  }

  clear() {
    this.unidad.competeId = null;
    this.unidad.competeItem = null;
    this.unidad.nombreunidad = null;
  }
}
