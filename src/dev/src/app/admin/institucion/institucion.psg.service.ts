/* PSG  Institucion Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Institucion } from './institucion.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class InstitucionService {
  private env: any = environment;
  private token: string;
  institucion = new Institucion();

  constructor(private http: Http) {}

  postGuardaInstitucion(institucion) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/admincontenido/institucion`, institucion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaInstitucion() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaInstitucionPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteInstitucion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/admincontenido/institucion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaInstitucion(institucion, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/admincontenido/institucion/` + id, institucion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaInstitucionPorOpcion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?opcionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorPregunta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?preguntaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorExamen(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?examenId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorPublicacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?publicacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorPrograma(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?programaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorGrupoa(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?grupoaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorRecurso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?recursoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorUnidad(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?unidadId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorCertificacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?certificacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorProfesor(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?profesorId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorEstudiante(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?estudianteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorRegistro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?registroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaInstitucionPorEvento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/institucion?eventoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetInstitucion(): Institucion {
    this.clear();
    return this.institucion;
  }

  getInstitucion(): Institucion {
    var institucion: Institucion = {
      claveinstitucion: this.institucion.claveinstitucion,
      nombreinstitucion: this.institucion.nombreinstitucion,
      representante: this.institucion.representante,
      paginaweb: this.institucion.paginaweb,
      telefono: this.institucion.telefono,
      tipoestatus: this.institucion.tipoestatus,
      tipoestatusItem: this.institucion.tipoestatusItem,
    };
    return institucion;
  }

  setInstitucion(institucion: Institucion) {
    this.institucion.claveinstitucion = institucion.claveinstitucion;
    this.institucion.nombreinstitucion = institucion.nombreinstitucion;
    this.institucion.representante = institucion.representante;
    this.institucion.paginaweb = institucion.paginaweb;
    this.institucion.telefono = institucion.telefono;
    this.institucion.tipoestatus = institucion.tipoestatus;
    this.institucion.tipoestatusItem = institucion.tipoestatusItem;
  }

  clear() {
    this.institucion.claveinstitucion = null;
    this.institucion.nombreinstitucion = null;
    this.institucion.representante = null;
    this.institucion.paginaweb = null;
    this.institucion.telefono = null;
    this.institucion.tipoestatus = null;
    this.institucion.tipoestatusItem = null;
  }
}
